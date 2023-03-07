import { html, css, createWCElements } from "../lib/dom"

const WS_URL = "ws://localhost:1313"

const template = html`<div class="box"></div>`

const style = css`
  .box {
    width: 320px;
    height: 200px;
    padding: 10px;
    background: linear-gradient(to bottom, green 25%, brown 100%);
    box-shadow: inset 0 0 15px #000;
    border-radius: 4px;
    border: 3px solid black;
    font-weight: 250;
    font-size: 1.2rem;
    color: yellow;
  }
`

interface Packet {
  type: string
  payload: any
}

class WcDebug extends HTMLElement {
  #socket: WebSocket

  constructor() {
    super()
    this.attachShadow({ mode: "open" }).append(...Array.from(createWCElements({ template, style })))

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
      this.shadowRoot!.querySelector(".box")!.innerHTML = data
      // let msg: Packet
      // try {
      //   msg = JSON.parse(data)
      // } catch {
      //   return console.log("Invalid message", data)
      // }
      // console.log("Message", msg)
    })
  }

  connectedCallback() {
    this.shadowRoot!.querySelector(".box")!.innerHTML = "Hello, World!"
  }

  disconnectedCallback() {
    this.#socket.close()
  }
}

customElements.define("wc-debug", WcDebug)

export {}
