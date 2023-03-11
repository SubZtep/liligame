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
  const { uuid: msgUuid, position } = msg
  if (!msgUuid || !position) throw new Error("Invalid message")

  let playerEl: HTMLElement
  if (!sessions.has(msgUuid)) {
    playerEl = document.createElement("div")
    playerEl.setAttribute("data-uuid", msgUuid)
    playerEl.classList.add("player")
    document.body.append(playerEl)
  } else {
    playerEl = document.querySelector(`[data-uuid="${msgUuid}"]`)!
    if (!playerEl) throw new Error("Player element not found")
  }
  playerEl.style.setProperty("--x", String(position.x))
  playerEl.style.setProperty("--y", String(-position.y))

  sessions.set(msgUuid, { position })

  debugEl.setAttribute("sessions", JSON.stringify(Array.from(sessions.entries()), null, 2))
})

export function play() {
  const joystick = document.createElement("joy-stick")
  joystick.addEventListener("AxisChange", ev => (player.position = ev.detail))
  document.body.classList.add("playing")
  document.body.append(joystick)
}

export function parseMessage(json: string): SocketMessage {
  let msg: SocketMessage
  try {
    msg = JSON.parse(json)
  } catch {
    throw new Error(`Invalid message: ${json}`)
  }
  return msg
}
