import {describe, it, expect, beforeEach, vitest} from 'vitest';
import {Game} from "$lib/game";

describe('up to ten game', () => {
	vitest.useFakeTimers()

	let game: Game
	beforeEach(() => {
		game = new Game()
		game.onError = vitest.fn(() => {})
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
			expect(game.onError).not.toHaveBeenCalled()
		}
	})

	it("doesn't increase score or updates value when incorrect answer is provided", () => {
		const prevValue = game.value
		const invalidAnswer = 11 - prevValue

		game.tryAnswer(invalidAnswer)
		expect(game.score).toBe(0)
		expect(game.value).toBe(prevValue)
		expect(game.onError).toHaveBeenCalledOnce()

		game.tryAnswer(invalidAnswer)
		expect(game.score).toBe(0)
		expect(game.value).toBe(prevValue)
		expect(game.onError).toHaveBeenCalledTimes(2)
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

	it("decreases score after time passes at half per second", () => {
		for(let i = 0; i < 10; i++) {
			const prevValue = game.value
			game.tryAnswer(10 - prevValue)
		}
		expect(game.score).toBe(10)

		vitest.advanceTimersByTime(1000)
		expect(game.score).toBeCloseTo(9.5)
	})
})
