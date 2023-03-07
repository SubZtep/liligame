const WS_URL = "ws://localhost:1313"

interface Packet {
  type: string
  payload: any
}

class WcClient extends HTMLElement {
  #socket: WebSocket

  constructor() {
    super()

    this.#socket = new WebSocket(WS_URL)

    this.#socket.addEventListener("error", ev => {
      console.log("Error", ev)
    })

    const send = (packet: Packet) => {
      this.#socket.send(JSON.stringify(packet))
    }

    this.#socket.addEventListener("open", () => {
      send({ type: "hello", payload: Math.random() })
    })

    this.#socket.addEventListener("close", ev => {
      console.log("Close", ev)
    })

    this.#socket.addEventListener("message", ({ data }) => {
      let msg: Packet
      try {
        msg = JSON.parse(data)
      } catch {
        return console.log("Invalid message", data)
      }
      console.log("Message", msg)
    })
  }

  connectedCallback() {}

  disconnectedCallback() {
    this.#socket.close()
  }
}

customElements.define("wc-client", WcClient)

export {}
