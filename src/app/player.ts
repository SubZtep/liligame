import { v4 as uuidv4 } from "uuid"

let id = window.localStorage.getItem("id")
if (!id) {
  id = uuidv4()
  window.localStorage.setItem("id", id)
}

let color = window.localStorage.getItem("color")
if (!color) {
  color = "#xxxxxx".replace(/x/g, y => ((Math.random() * 16) | 0).toString(16))
  window.localStorage.setItem("color", color)
}

export const player = { id, color }
