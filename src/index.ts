import { player } from "./app/player"
import { onTouch } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)

onTouch(
  (x, y) => {
    const msg = {
      id: player.id,
      color: player.color,
      x: x / window.innerWidth,
      y: y / window.innerHeight
    }
    socket.send(JSON.stringify(msg))

    // const el = createSVGCircle(x, y, color)
    const el = document.createElement("div")
    el.style.setProperty("--pos", `translate(${x}px, ${y}px)`)
    el.style.setProperty("--color", player.color)
    el.classList.add("touch")
    return document.body.appendChild(el)
  },
  el => {
    document.body.removeChild(el)
  }
)

socket.addEventListener("open", () => {
  console.log("Connected")
})

socket.addEventListener("message", ev => {
  console.log("Message", ev)
})

export {}
