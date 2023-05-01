// import { v4 as uuidv4 } from "uuid"
import "./style.css"

// let id = window.localStorage.getItem("id")
// if (!id) {
//   id = uuidv4()
//   window.localStorage.setItem("id", id)
// }

const color = "#xxxxxx".replace(/x/g, y => ((Math.random() * 16) | 0).toString(16))

const socket = new WebSocket(import.meta.env.VITE_WSPP)

socket.addEventListener("open", () => {
  console.log("Connected")
})

document.body.addEventListener("click", ev => {
  // console.log(uuidv4())
  const msg = {
    // id,
    color,
    x: ev.clientX,
    y: ev.clientY,
    width: window.screen.width,
    height: window.screen.height,
    pixelRatio: window.devicePixelRatio
  }
  socket.send(JSON.stringify(msg))
  // // socket.send("ping")
  // console.log("ping", [ev.clientX, ev.clientY])
})

socket.addEventListener("message", ev => {
  console.log("Message", ev)
})

export {}
