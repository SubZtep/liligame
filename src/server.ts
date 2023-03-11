import type { PlayerSession, SocketMessage } from "./types/ws"
import WebSocket, { WebSocketServer } from "ws"

const sessions = new Map<string, PlayerSession>()

const wss = new WebSocketServer({ port: +process.env.VITE_WS_PORT! }, () => {
  console.log("WebSocket server running on port", process.env.VITE_WS_PORT)
})

wss.on("connection", ws => {
  ws.send(JSON.stringify({ sessions: Array.from(sessions.entries()) }))

  ws.on("error", ev => console.log("WS Error", ev))

  // ws.on("open", () => {
  //   console.log("open")
  //   ws.send("OOOOOPEN" + Date.now())
  // })

  // ws.on("close", () => {
  //   console.log("close")
  // })

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
      // if (!sessions.has(msg.uuid)) {
      //   sessions.set(msg.uuid, {})
      // }

      // if (msg.position) {
      //   sessions.set(msg.uuid, { position: msg.position })
      // }
    }

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})

wss.on("error", ev => console.log("WSS Error", ev))

export {}
