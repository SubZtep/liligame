import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from "vitest/config"
import { readdirSync } from "node:fs"
import { resolve } from "node:path"

export default defineConfig({
  plugins: [tsconfigPaths()],
  build: {
    rollupOptions: {
      input: Object.fromEntries([
        ["main", resolve(__dirname, "index.html")],
        ...readdirSync(resolve(__dirname, "games")).map(dir => [
          dir,
          resolve(__dirname, `games/${dir}/index.html`)
        ])
      ])
    }
  },
  server: {
    port: 1337
  },
  test: {
    watch: false
  }
})
