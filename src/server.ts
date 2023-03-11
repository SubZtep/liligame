import type { PlayerSession, SocketMessage } from "./types/ws"
import WebSocket, { WebSocketServer } from "ws"

const sessions = new Map<string, PlayerSession>()

const wss = new WebSocketServer(
  {
    port: +process.env.VITE_WS_PORT!,
    clientTracking: true
  },
  () => {
    console.log("WebSocket server running on port", process.env.VITE_WS_PORT)
  }
)

wss.on("connection", ws => {
  ws.on("error", ev => console.log("WS Error", ev))

  ws.on("message", (data, isBinary) => {
    console.log("Message received", data.toString())
    let msg: SocketMessage
    try {
      msg = JSON.parse(data.toString())
    } catch {
      return console.log("Invalid message", data)
    }

    if (msg.uuid) {
      const { uuid, ...session } = msg
      sessions.set(uuid, session)
    }

    wss.clients.forEach(client => {
      if (/* client !== ws && */ client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})

wss.on("error", ev => console.log("WSS Error", ev))

export {}
