import { player } from "./app/player"
import { onMove, onEnd } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)
const { id, color } = player

type Message =
  | { cmd: "add"; id: string; color: string; poses: Position[] }
  | { cmd: "move"; id: string; color: string; poses: Position[] }
  | { cmd: "remove"; id: string }

const sendMessage = (msg: Message) => {
  socket.send(JSON.stringify(msg))
}

onMove(poses => {
  sendMessage({ cmd: "move", id, color, poses })
})

onEnd(() => {
  sendMessage({ cmd: "remove", id })
})

socket.addEventListener("message", data => {
  const msg = JSON.parse(data.data) as Message
  switch (msg.cmd) {
    case "move":
      let els = document.querySelectorAll<HTMLElement>(`[data-id="${msg.id}"]`)
      if (els.length === 0) {
        for (let i = 0; i < 10; i++) {
          const el = document.createElement("div")
          el.dataset.id = msg.id
          el.classList.add("touch")
          document.body.appendChild(el)
        }
        els = document.querySelectorAll(`[data-id="${msg.id}"]`)
      }
      els.forEach((el, i) => {
        el.style.top = msg.poses[i] ? `${(msg.poses[i].y * window.innerHeight) - 40}px` : "-200px"
        el.style.left = msg.poses[i] ? `${(msg.poses[i].x * window.innerWidth) - 40}px` : "-200px"
        el.style.setProperty("--color", msg.color)
      })
      break
    case "remove":
      document.querySelectorAll(`[data-id="${msg.id}"]`).forEach(el => document.body.removeChild(el))
      break
  }
})

// socket.addEventListener("open", ev => {
//   console.log("Connected", ev)
// })
// socket.addEventListener("close", ev => {
//   console.log("Disconnected", ev)
// })

export {}
