import type { SocketMessage } from "../types/ws"

export function parseMessage(json: string): SocketMessage {
  let msg: SocketMessage
  try {
    msg = JSON.parse(json)
  } catch {
    throw new Error(`Invalid message: ${json}`)
  }

  return msg
}
