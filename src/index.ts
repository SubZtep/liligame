import { parseMessage } from "./lib/socket"
import type { PlayerSession } from "./types/ws"
import "./components/joy-stick"
import "./components/wc-client"
import "./components/wc-debug"
import "./styles/index.css"

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

let sessions: Map<string, PlayerSession>

const socket = new WebSocket(import.meta.env.VITE_WS_URL)

// socket.addEventListener("error", ev => {
//   console.log("Error", ev)
// })

// socket.addEventListener("open", () => {
//   send({ type: "hello", payload: Math.random() })
// })

// socket.addEventListener("close", ev => {
//   console.log("Close", ev)
// })

socket.addEventListener("message", ({ data }) => {
  console.log("Message", data)
  const msg = parseMessage(data)

  if (msg.sessions) {
    sessions = new Map(msg.sessions)
  } else if (msg.uuid) {
    let session = sessions.get(msg.uuid)
    if (!session) {
      session = {}
    }
    if (msg.position) {
      session.position = msg.position
    }
    sessions.set(msg.uuid, session)
  }

  // document.getElementById("debug")!.innerHTML = JSON.stringify(sessions, null, 2)
  console.log("EK", document.getElementById("debug")?.innerHTML)
  // console.log("DEBUG", JSON.stringify(Array.from(sessions.entries()), null, 2))

  document.getElementById("debug")!.innerHTML = JSON.stringify(Array.from(sessions.entries()), null, 2)
})

export {}
