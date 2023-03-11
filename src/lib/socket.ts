import { v4 } from "uuid"
import type { SocketMessage, PlayerSession, Axes } from "../types/ws"

export const uuid = v4()

document.querySelector("h1")!.innerHTML = uuid
const playerEl = document.getElementById("player")!
const debugEl = document.getElementById("debug")!

const socket = new WebSocket(import.meta.env.VITE_WS_URL)

const rawPlayer: PlayerSession = {}
const player = new Proxy(rawPlayer, {
  set(obj, prop, value) {
    obj[prop] = value

    const packet = JSON.stringify({ uuid, position: value })
    socket.send(packet)

    playerEl.innerHTML = JSON.stringify(rawPlayer, null, 2)
    return true
  }
})

const sessions = new Map<string, PlayerSession>()

socket.addEventListener("message", ({ data }) => {
  const msg = parseMessage(data)
  if (!msg.uuid) throw new Error("Invalid message, missing uuid")

  const { uuid: msgUuid, position } = msg
  sessions.set(msgUuid, { position })

  debugEl.innerHTML = JSON.stringify(Array.from(sessions.entries()), null, 2)
})

document.querySelector("joy-stick")!.addEventListener("PlayerPositionChanged", ev => {
  player.position = (ev as CustomEvent<Axes>).detail
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
