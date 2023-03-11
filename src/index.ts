import "./components/joy-stick"
import "./components/wc-debug"
import "./styles/index.css"
import "./lib/socket"

// Set current time day/night gradient
document.body.classList.add(`sky-gradient-${new Date().getHours()}`)

export {}
