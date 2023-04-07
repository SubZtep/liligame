// import "~/components/wc-debug"
import "~/styles/index.css"
import "./index.css"

console.log("Hello World")

const canvas = document.querySelector("canvas")!
const ctx = canvas.getContext("2d")!
ctx.fillStyle = "blue";
canvas.addEventListener('touchmove', function(event) {
  console.log(event)
  // for (var i = 0; i < event.touches.length; i++) {
  //   var touch = event.touches[i];
  //   ctx.beginPath();++
  //   ctx.arc(touch.pageX, touch.pageY, 20, 0, 2*Math.PI, true);
  //   ctx.fill();
  //   ctx.stroke();
  // }
}, false);
