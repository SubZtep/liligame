// import Matter from "matter-js"
import { Engine, Render, Runner, Bodies, Composite } from "matter-js"
import { createWCElements, html, css } from "../lib/dom"

// module aliases
// const Engine = Matter.Engine,
//   Render = Matter.Render,
//   Runner = Matter.Runner,
//   Bodies = Matter.Bodies,
//   Composite = Matter.Composite

class PhysicMatter extends HTMLElement {
  static get observedAttributes() {
    return ["width", "height"]
  }

  constructor() {
    super()
    // this.attachShadow({ mode: "open" }).append(
    //   ...Array.from(
    //     createWCElements({
    //       template: html`<canvas class="confetti"></canvas>`,
    //       style: css`
    //         .confetti {
    //           pointer-events: none;
    //           position: absolute;
    //           top: 0;
    //           left: 0;
    //           width: 100%;
    //           height: 100%;
    //           z-index: 2;
    //         }
    //       `
    //     })
    //   )
    // )
    const canvas = document.createElement("canvas")
    this.attachShadow({ mode: "open" }).append(canvas)

    // create an engine
    var engine = Engine.create()

    const { innerWidth: width, innerHeight: height } = window
    // create a renderer
    var render = Render.create({
      canvas,
      // element: document.body,
      engine,
      options: {
        width,
        height,
        pixelRatio: 1,
        background: "#ffa1d5",
        wireframeBackground: "#222"
        // hasBounds: false,
        // enabled: true,
        // wireframes: false,
        // showSleeping: true,
        // showDebug: false,
        // showBroadphase: false,
        // showBounds: false,
        // showVelocity: false,
        // showCollisions: false,
        // showSeparations: false,
        // showAxes: false,
        // showPositions: false,
        // showAngleIndicator: false,
        // showIds: false,
        // showShadows: false,
        // showVertexNumbers: false,
        // showConvexHulls: false,
        // showInternalEdges: false,
        // showMousePosition: false
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
  }

  // disconnectedCallback() {
  //   // World.clear(world)
  //   // Engine.clear(engine)
  //   // Render.stop(render)
  //   // Runner.stop(runner)
  //   // render.canvas.remove()
  //   // render.canvas = null
  //   // render.context = null
  //   // render.textures = {}
  // }
}

customElements.define("physics-matter", PhysicMatter)

// export {}
