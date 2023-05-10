import { player } from "../src/app/player"

test("Player hex color", () => {
  expect(player.color).toMatch(/^#[0-9a-f]{6}$/)
})
