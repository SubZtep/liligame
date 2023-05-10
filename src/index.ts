import { player } from "./app/player"
import { onMove } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)
const { id, color } = player

onMove(poses => {
  socket.send(JSON.stringify({ cmd: "move", id, color, poses } as Message))
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
      } else if (msg.poses.length === 0) {
        els.forEach(el => document.body.removeChild(el))
        return
      }
      els.forEach((el, i) => {
        el.style.top = msg.poses[i] ? `${msg.poses[i].y * window.innerHeight - 40}px` : "-200px"
        el.style.left = msg.poses[i] ? `${msg.poses[i].x * window.innerWidth - 40}px` : "-200px"
        el.style.setProperty("--color", msg.color)
      })
      break
  }
})

socket.addEventListener("open", () => {
  document.body.style.backgroundColor = "#000"
})

socket.addEventListener("close", () => {
  document.body.style.backgroundColor = "#333"
})
