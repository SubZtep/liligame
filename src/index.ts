import { player } from "./app/player"
import { onStart, onEnd } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)
const { id, color } = player

type Message =
  | { cmd: "add"; id: string; color: string; x: number; y: number }
  // | { cmd: "add"; id: string; color: string; touches: MyTouch[] }
  // | { cmd: "move"; id: string; touches: MyTouch[] }
  | { cmd: "remove"; id: string }

const sendMessage = (msg: Message) => {
  socket.send(JSON.stringify(msg))
}

onStart((x, y) => {
  sendMessage({ cmd: "add", id, color, x, y })
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
      el = document.createElement("div")
      el.dataset.id = msg.id
      el.style.setProperty("--pos", `translate(${msg.x}px, ${msg.y}px)`)
      el.style.setProperty("--color", msg.color)
      el.classList.add("touch")
      document.body.appendChild(el)
      break
    // case "move":
    //   el = document.querySelector(`[data-id="${msg.id}"]`)
    //   el?.style.setProperty("--pos", `translate(${msg.x}px, ${msg.y}px)`)
    //   break
    case "remove":
      el = document.querySelector(`[data-id="${msg.id}"]`)
      el && document.body.removeChild(el)
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
