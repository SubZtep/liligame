import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WS)

document.body.addEventListener("click", () => {
  socket.send("ping")
})


socket.addEventListener("message", ev => {
  console.log("Message", ev)
})

export {}
