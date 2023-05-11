import { createWebSocketConnection } from "./app/connection"
import { player } from "./app/player"
import { onMove } from "./app/touches"
import "./style.css"

document.body.style.setProperty("--color", player.color)
const { socket, sendMessage } = createWebSocketConnection()

onMove(poses => {
  sendMessage({ id: player.id, color: player.color, poses })
})

socket.addEventListener("message", ({ data }) => {
  const { id, color, poses } = JSON.parse(data) as Message
  let els = document.querySelectorAll<HTMLElement>(`[data-id="${id}"]`)

  if (els.length === 0) {
    for (let i = 0; i < 10; i++) {
      const el = document.createElement("div")
      el.dataset.id = id
      el.classList.add("touch")
      document.body.appendChild(el)
    }
    els = document.querySelectorAll(`[data-id="${id}"]`)
  } else if (poses.length === 0) {
    els.forEach(el => document.body.removeChild(el))
    return
  }

  els.forEach((el, i) => {
    el.style.top = poses[i] ? `${poses[i].y * window.innerHeight - 40}px` : "-200px"
    el.style.left = poses[i] ? `${poses[i].x * window.innerWidth - 40}px` : "-200px"
    el.style.setProperty("--color", color)
  })
})
