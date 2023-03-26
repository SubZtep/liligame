import "~/components/canvas-confetti"
// import "~/components/wc-debug"
import "~/styles/index.css"
import "./index.css"

const confetti = document.querySelector("canvas-confetti")

document.body.addEventListener("click", ({ clientX, clientY }) => {
  const { innerWidth, innerHeight } = window
  const normalAxes = { x: clientX / innerWidth, y: clientY / innerHeight }

  confetti?.setAttribute("origin", JSON.stringify(normalAxes))
})

console.log("Hello World")
