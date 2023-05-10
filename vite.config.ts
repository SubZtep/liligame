import { defineConfig } from "vitest/config"

export default defineConfig({
  build: {
    minify: false
  },
  test: {
    globals: true,
    environment: "happy-dom",
    reporters: ["verbose"],
    watch: false
  }
})
