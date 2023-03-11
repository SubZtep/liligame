import "./components/joy-stick"
import "./components/wc-debug"
import "./components/play-button"
import "./styles/index.css"
import "./lib/socket"
import { play } from "./lib/socket"
import * as Matter from "matter-js"
import * as confetti from "canvas-confetti"

const myCanvas = document.createElement("canvas")
myCanvas.classList.add("confetti")
document.body.appendChild(myCanvas)

const myConfetti = confetti.create(myCanvas, {
  resize: true,
  useWorker: true
})

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

document.querySelector("play-button")?.addEventListener(
  "StartPlaying",
  ev => {
    ;(ev.target as HTMLElement).remove()
    myConfetti({
      particleCount: 150,
      startVelocity: 60,
      spread: 90,
      angle: 120,
      origin: { x: 1, y: 1 }
    })
    play()
  },
  { once: true }
)

export {}

// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite

// create an engine
var engine = Engine.create()

// create a renderer
var render = Render.create({
  element: document.body,
  engine: engine,

  options: {
    width: 800,
    height: 500,
    pixelRatio: 1,
    background: "#ffa1d5",
    wireframeBackground: "#222",
    hasBounds: false,
    enabled: true,
    wireframes: false,
    showSleeping: true,
    showDebug: false,
    showBroadphase: false,
    showBounds: false,
    showVelocity: false,
    showCollisions: false,
    showSeparations: false,
    showAxes: false,
    showPositions: false,
    showAngleIndicator: false,
    showIds: false,
    showShadows: false,
    showVertexNumbers: false,
    showConvexHulls: false,
    showInternalEdges: false,
    showMousePosition: false
  }
})

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80)
var boxB = Bodies.rectangle(450, 50, 80, 80)
var ground = Bodies.rectangle(400, 510, 810, 60, { isStatic: true })

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground])

// run the renderer
Render.run(render)

// create runner
var runner = Runner.create()

// run the engine
Runner.run(runner, engine)
