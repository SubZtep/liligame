import { player } from "./app/player"
import { onTouch } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)

const { id, color } = player

onTouch((x, y) => {
  const msg = {
    id,
    x,
    y,
    color,
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio
  }
  socket.send(JSON.stringify(msg))
})

socket.addEventListener("open", () => {
  console.log("Connected")
})

socket.addEventListener("message", ev => {
  console.log("Message", ev)
})

export {}
