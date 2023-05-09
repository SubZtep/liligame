import { player } from "./app/player"
import { onStart, onEnd } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)
const { id, color } = player

type Message =
  // | { cmd: "add"; id: string; color: string; x: number; y: number }
  | { cmd: "add"; id: string; color: string; poses: Position[] }
  // | { cmd: "move"; id: string; touches: MyTouch[] }
  | { cmd: "remove"; id: string }

const sendMessage = (msg: Message) => {
  socket.send(JSON.stringify(msg))
}

onStart(poses => {
  sendMessage({ cmd: "add", id, color, poses })
})

// onMove(touches => {
//   sendMessage({ cmd: "move", id, touches })
// })

onEnd(() => {
  sendMessage({ cmd: "remove", id })
})

socket.addEventListener("message", data => {
  const msg = JSON.parse(data.data) as Message
  let el: HTMLElement | null
  switch (msg.cmd) {
    case "add":
      msg.poses.forEach(({ x, y }) => {
        el = document.createElement("div")
        el.dataset.id = msg.id
        el.style.setProperty("--pos", `translate(${x}px, ${y}px)`)
        el.style.setProperty("--color", msg.color)
        el.classList.add("touch")
        document.body.appendChild(el)
      })
      break
    // case "move":
    //   el = document.querySelector(`[data-id="${msg.id}"]`)
    //   el?.style.setProperty("--pos", `translate(${msg.x}px, ${msg.y}px)`)
    //   break
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
