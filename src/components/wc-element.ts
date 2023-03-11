// import { v4 } from "uuid"
// import { WS_URL } from "../config"

import type { SocketMessage } from "types/ws"

export class WcElement extends HTMLElement {
  protected socket: WebSocket

  // uuid = v4()
  constructor() {
    super()

    // console.log("UUID", this.uuid)

    // @ts-ignore
    // console.log("EWFWE", this.uuid)

    this.socket = new WebSocket(import.meta.env.VITE_WS_URL)

    // this.socket.addEventListener("error", ev => {
    //   console.log("Error", ev)
    // })

    // this.socket.addEventListener("open", ev => {
    //   console.log("Open", ev)
    //   // this.send({ "hello")
    // })

    // this.socket.addEventListener("close", ev => {
    //   console.log("Close", ev)
    // })

    // this.socket.addEventListener("message", ({ data }) => {
    //   console.log("Message", data)
    //   // let msg: Packet
    //   // try {
    //   //   msg = JSON.parse(data)
    //   // } catch {
    //   //   return console.log("Invalid message", data)
    //   // }
    //   // this.shadowRoot!.querySelector(".box")!.innerHTML = JSON.stringify(msg, null, 2)
    // })
  }

  protected send = <T extends SocketMessage>(packet: T) => {
    this.socket.send(JSON.stringify(packet))
  }

  disconnectedCallback() {
    this.socket.close()
  }
}

// customElements.define("wc-element", WcElement)

export {}
