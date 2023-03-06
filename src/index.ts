const socket = new WebSocket("ws://localhost:1313")

interface Packet {
  type: string
  payload: any
}

const send = (packet: Packet) => {
  socket.send(JSON.stringify(packet))
}

socket.addEventListener("error", ev => {
  console.log("Error", ev)
})

socket.addEventListener("open", () => {
  send({ type: "hello", payload: Math.random() })
})

socket.addEventListener("close", ev => {
  console.log("Close", ev)
})

socket.addEventListener("message", ({ data }) => {
  let msg: Packet
  try {
    msg = JSON.parse(data)
  } catch {
    return console.log("Invalid message", data)
  }
  console.log("Message", msg)
})

export {}
