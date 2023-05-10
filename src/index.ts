import { player } from "./app/player"
import { onStart, onMove, onEnd } from "./app/touches"
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

// onStart(poses => {
//   sendMessage({ cmd: "move", id, color, poses })
// })

onMove(poses => {
  sendMessage({ cmd: "move", id, color, poses })
})

onEnd(() => {
  sendMessage({ cmd: "remove", id })
})

socket.addEventListener("message", data => {
  const msg = JSON.parse(data.data) as Message
  switch (msg.cmd) {
    // case "add":
    //   for (let i = 0; i < 10; i++) {
    //     const el = document.createElement("div")
    //     el.dataset.id = msg.id
    //     el.style.setProperty(
    //       "--pos",
    //       msg.poses[i] ? `translate(${msg.poses[i].x}px, ${msg.poses[i].y}px)` : "translate(-200px, -200px)"
    //     )
    //     el.style.setProperty("--color", msg.color)
    //     el.classList.add("touch")
    //     document.body.appendChild(el)
    //   }
    //   break
    case "move":
      let els = document.querySelectorAll<HTMLElement>(`[data-id="${msg.id}"]`)
      if (els.length === 0) {
        for (let i = 0; i < 10; i++) {
          const el = document.createElement("div")
          el.dataset.id = msg.id
          el.style.setProperty("--color", msg.color)
          el.classList.add("touch")
          document.body.appendChild(el)
        }
        els = document.querySelectorAll(`[data-id="${msg.id}"]`)
      }
      els.forEach((el, i) => {
        el.style.setProperty("--x", msg.poses[i] ? `${msg.poses[i].x}px` : "-200px")
        el.style.setProperty("--y", msg.poses[i] ? `${msg.poses[i].y}px` : "-200px")
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
