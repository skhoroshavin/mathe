import {describe, it, expect, beforeEach} from 'vitest';
import {Game} from "$lib/game";

describe('sum test', () => {
	let game: Game
	beforeEach(() => {
		game = new Game()
	})

	it("starts with zero score and value within 1..9", () => {
		expect(game.score).toBe(0)
		expect(game.value).toBeGreaterThanOrEqual(1)
		expect(game.value).toBeLessThanOrEqual(9)
	})

	it("increases score and updates value when correct answer is provided", () => {
		for(let i = 0; i < 20; i++) {
			const prevValue = game.value
			game.tryAnswer(10 - prevValue)
			expect(game.score).toBe(i+1)
			expect(game.value).not.toBe(prevValue)
		}
	})

	it("doesn't increase score or updates value when incorrect answer is provided", () => {
		const prevValue = game.value
		game.tryAnswer(10 - prevValue + 1)
		expect(game.score).toBe(0)
		expect(game.value).toBe(prevValue)
	})

	it("always has value from 1 to 9", () => {
		let values = [game.value]
		for(let i = 0; i < 100; i++) {
			game.tryAnswer(10 - game.value)
			values = [...values, game.value]
		}
		expect(Math.min(...values)).toBe(1)
		expect(Math.max(...values)).toBe(9)
	})
})
