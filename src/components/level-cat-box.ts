import { css } from "../lib/dom"
import { Engine, Render, Runner, Bodies, Composite, Composites, Mouse, MouseConstraint, World } from "matter-js"

class LevelCatBox extends HTMLElement {
  static get observedAttributes() {
    return ["width", "height"]
  }

  engine: Engine
  world: Matter.World
  render: Render
  runner: Runner

  constructor() {
    super()
    const canvas = document.createElement("canvas")
    this.attachShadow({ mode: "open" }).append(canvas)

    // create engine
    this.engine = Engine.create()
    this.world = this.engine.world

    const { innerWidth: width, innerHeight: height } = window

    // create renderer
    this.render = Render.create({
      // element: document.body,
      canvas,
      engine: this.engine,
      options: {
        background: "transparent",
        width,
        height,
        showAngleIndicator: false,
        wireframes: false
      }
    })

    Render.run(this.render)

    // create runner
    this.runner = Runner.create()
    Runner.run(this.runner, this.engine)

    // add bodies
    var offset = 10,
      options = {
        isStatic: true
      }

    this.world.bodies = []

    // these static walls will not be rendered in this sprites example, see options
    Composite.add(this.world, [
      Bodies.rectangle(200, 150, 700, 20, { isStatic: true, angle: Math.PI * 0.06, render: { fillStyle: "#ffa1d5" } }),
      Bodies.rectangle(500, 350, 700, 20, { isStatic: true, angle: -Math.PI * 0.06, render: { fillStyle: "#ffa1d5" } }),
      Bodies.rectangle(340, 580, 700, 20, { isStatic: true, angle: Math.PI * 0.04, render: { fillStyle: "#ffa1d5" } })
      // Bodies.rectangle(400, -offset, 800.5 + 2 * offset, 50.5, options),
      // Bodies.rectangle(400, 600 + offset, 800.5 + 2 * offset, 50.5, options),
      // Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
      // Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
    ])

    var stack = Composites.stack(20, 20, 10, 4, 0, 0, function (x: number, y: number) {
      // if (Common.random() > 0.35) {
      return Bodies.rectangle(x, y, 64, 64, {
        render: {
          strokeStyle: "#ffffff",
          sprite: {
            texture: "./images/square_cat.png",
            xScale: 0.5,
            yScale: 0.5
          }
        }
      })
      // } else {
      //   return Bodies.circle(x, y, 46, {
      //     density: 0.0005,
      //     frictionAir: 0.06,
      //     restitution: 0.3,
      //     friction: 0.01,
      //     render: {
      //       sprite: {
      //         texture: "./img/ball.png"
      //       }
      //     }
      //   })
      // }
    })

    Composite.add(this.world, stack)

    // add mouse control
    const mouse = Mouse.create(this.render.canvas),
      mouseConstraint = MouseConstraint.create(this.engine, {
        mouse: mouse,
        constraint: {
          stiffness: 0.2,
          render: {
            visible: false
          }
        }
      })

    Composite.add(this.world, mouseConstraint)

    // keep the mouse in sync with rendering
    this.render.mouse = mouse

    // fit the render viewport to the scene
    Render.lookAt(this.render, {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    })
  }

  disconnectedCallback() {
    World.clear(this.world, false)
    Engine.clear(this.engine)
    Render.stop(this.render)
    Runner.stop(this.runner)
    this.render.canvas.remove()
    // @ts-expect-error
    this.render.canvas = null
    // @ts-expect-error
    this.render.context = null
    this.render.textures = {}
  }
}

customElements.define("level-cat-box", LevelCatBox)

export {}
