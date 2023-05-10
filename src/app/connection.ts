export function createWebSocketConnection() {
  const socket = new WebSocket(import.meta.env.VITE_WSPP)
  socket.addEventListener("open", () => document.body.classList.add("connected"))
  socket.addEventListener("close", () => document.body.classList.remove("connected"))

  const sendMessage = (msg: Message) => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(msg))
    }
  }

  return { socket, sendMessage }
}
