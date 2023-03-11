import { v4 } from "uuid"
import type { SocketMessage, PlayerSession } from "../types/ws"

export const uuid = v4()
const socket = new WebSocket(import.meta.env.VITE_WS_URL)
const debugEl = document.querySelector("wc-debug")!

const sessions = new Map<string, PlayerSession>()
const rawPlayer: PlayerSession = {}

const player = new Proxy(rawPlayer, {
  set(obj, prop, value) {
    obj[prop] = value
    const packet = JSON.stringify({ uuid, position: value })
    socket.send(packet)
    return true
  }
})

socket.addEventListener("message", ({ data }) => {
  const msg = parseMessage(data)
  if (!msg.uuid) throw new Error("Invalid message, missing uuid")

  const { uuid: msgUuid, position } = msg
  sessions.set(msgUuid, { position })

  debugEl.setAttribute("sessions", JSON.stringify(Array.from(sessions.entries()), null, 2))
})

document.querySelector("joy-stick")!.addEventListener("PlayerPositionChanged", ev => {
  player.position = ev.detail
})

export function parseMessage(json: string): SocketMessage {
  let msg: SocketMessage
  try {
    msg = JSON.parse(json)
  } catch {
    throw new Error(`Invalid message: ${json}`)
  }
  return msg
}
