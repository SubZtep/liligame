import { parseMessage } from "./lib/socket"
import type { PlayerSession, Axes } from "./types/ws"
import "./components/joy-stick"
// import "./components/wc-client"
// import "./components/wc-debug"
import "./styles/index.css"
import { v4 } from "uuid"

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

const uuid = v4()

document.querySelector("h1")!.innerHTML = uuid

const socket = new WebSocket(import.meta.env.VITE_WS_URL)

const rawPlayer: PlayerSession = {}
const player = new Proxy(rawPlayer, {
  set(obj, prop, value) {
    // console.log("SENDING", value)
    obj[prop] = value

    const packet = JSON.stringify({ uuid, position: value })
    socket.send(packet)
    console.log(`SEND ${uuid.split("-")[0]}`, packet)

    document.getElementById("player")!.innerHTML = JSON.stringify(rawPlayer, null, 2)
    return true
  }
})

// player.position = { x: 0, y: 0 }

const rawSessions = new Map<string, PlayerSession>()
const sessions = new Proxy(rawSessions, {
  set(obj, prop, value) {
    obj[prop] = value

    // if (prop === uuid) {
    //   console.log("SENDING", value)
    //   socket.send(JSON.stringify({ uuid, position: value }))
    // }
    return true
  },
  get(target, prop) {
    // console.log("GET", { target, prop, receiver })
    // @ts-ignore
    let value = Reflect.get(...arguments)
    // console.log("GET", { target, prop, value })
    return typeof value === "function" ? value.bind(target) : value
  }
})

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
  // console.log("Message", {data, uuid})
  console.log(`RECEIVE ${uuid.split("-")[0]}`, data)


  const msg = parseMessage(data)

  if (msg.sessions) {
    sessions.clear()
    msg.sessions.forEach(([k, v]) => sessions.set(k, v))
    // rawSessions = new Map(msg.sessions)
    // sessions = new Proxy(rawSessions, {
    //   set(obj, prop, value) {
    //     obj[prop] = value

    //     if (prop === uuid) {
    //       console.log("SENDING", value)
    //       socket.send(JSON.stringify({ uuid, position: value }))
    //     }
    //     return true
    //   },
    //   get(target, prop) {
    //     // console.log("GET", { target, prop, receiver })
    //     // @ts-ignore
    //     let value = Reflect.get(...arguments)
    //     console.log("GET", { target, prop, value })
    //     return typeof value === "function" ? value.bind(target) : value
    //   }
    // })
  } else if (msg.uuid) {
    player.position = msg.position
    // let session = sessions.get(msg.uuid)
    // if (!session) {
    //   session = {}
    // }
    // if (msg.position) {
    //   session.position = msg.position
    // }
    // sessions.set(msg.uuid, session)
  }

  // document.getElementById("debug")!.innerHTML = JSON.stringify(sessions, null, 2)
  // console.log("EK", document.getElementById("debug")?.innerHTML)
  // console.log("DEBUG", JSON.stringify(Array.from(sessions.entries()), null, 2))

  document.getElementById("debug")!.innerHTML = JSON.stringify(Array.from(sessions.entries()), null, 2)
})

// @ts-ignore
document.querySelector("joy-stick")!.addEventListener("PlayerPositionChanged", ({ detail }: { detail: Axes }) => {
  // socket.send(JSON.stringify({ uuid, position: detail }))
  // sessions.set(uuid, { position: detail })
  player.position = detail
})

export {}
