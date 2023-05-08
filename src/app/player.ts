import { v4 as uuidv4 } from "uuid"

export let id = window.localStorage.getItem("id")
if (!id) {
  id = uuidv4()
  window.localStorage.setItem("id", id)
}

export const color = "#xxxxxx".replace(/x/g, y => ((Math.random() * 16) | 0).toString(16))
