import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)

socket.addEventListener("open", () => {
  console.log("Connected")
})

document.body.addEventListener("click", () => {
  socket.send("ping")
})


socket.addEventListener("message", ev => {
  console.log("Message", ev)
})

export {}
