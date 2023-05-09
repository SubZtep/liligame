import { player } from "./app/player"
import { onStart, onMove, onEnd } from "./app/touches"
import "./style.css"

const socket = new WebSocket(import.meta.env.VITE_WSPP)

const elements = new Map<string, HTMLElement>()
const { id, color } = player
let el: HTMLElement

type Message =
  | { cmd: "add"; id: string; color: string; x: number; y: number }
  | { cmd: "move"; id: string; x: number; y: number }
  | { cmd: "remove"; id: string }

onStart((x, y) => {
  socket.send(JSON.stringify({ cmd: "add", id, color, x, y } as Message))
})

onMove((x, y) => {
  socket.send(JSON.stringify({ cmd: "move", id, x, y } as Message))
})

onEnd((x, y) => {
  socket.send(JSON.stringify({ cmd: "remove", id } as Message))
})

// onTouch(
//   (x, y) => {
//     const msg: Message = {
//       cmd: "add",
//       id: player.id,
//       color: player.color,
//       x: x / window.innerWidth,
//       y: y / window.innerHeight
//     }
//     socket.send(JSON.stringify(msg))

//     // // const el = createSVGCircle(x, y, color)
//     // const el = document.createElement("div")
//     // el.style.setProperty("--pos", `translate(${x}px, ${y}px)`)
//     // el.style.setProperty("--color", player.color)
//     // el.classList.add("touch")
//     // return document.body.appendChild(el)
//   },
//   // el => {
//   //   document.body.removeChild(el)
//   // }
// )

// socket.addEventListener("open", ev => {
//   console.log("Connected", ev)
// })

socket.addEventListener("message", data => {
  const msg = JSON.parse(data.data) as Message
  let el: HTMLElement
  switch (msg.cmd) {
    case "add":
      el = document.createElement("div")
      // el.dataset.id = msg.id
      el.style.setProperty("--pos", `translate(${msg.x}px, ${msg.y}px)`)
      el.style.setProperty("--color", msg.color)
      el.classList.add("touch")
      elements.set(msg.id, el)
      document.body.appendChild(el)
      break
    case "move":
      el = elements.get(msg.id)!
      el.style.setProperty("--pos", `translate(${msg.x}px, ${msg.y}px)`)
      break
    case "remove":
      el = elements.get(msg.id)!
      document.body.removeChild(el)
      elements.delete(msg.id)
      break
  }

  // console.log("Message", data)
})

// socket.addEventListener("close", ev => {
//   console.log("Disconnected", ev)
// })

export {}
