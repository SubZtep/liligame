import WebSocket, { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 1313 })

wss.on("connection", ws => {
  ws.on("error", console.error)

  ws.on("open", () => {
    console.log("connected")
    ws.send(Date.now())
  })

  ws.on("close", () => {
    console.log("disconnected")
  })

  ws.on("message", (data, isBinary) => {
    console.log("Message", data.toString())
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary })
      }
    })
  })
})
