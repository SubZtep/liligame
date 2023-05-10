import { v4 as uuid } from "uuid"

let id = window.localStorage.getItem("id")
if (!id) {
  id = uuid()
  window.localStorage.setItem("id", id)
}

const color = "#xxxxxx".replace(/x/g, y => ((Math.random() * 16) | 0).toString(16))

export const player: Player = { id, color }
