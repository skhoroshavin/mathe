import {beforeEach, describe, expect, it, vitest} from 'vitest';
import {Game} from "./game";

describe('up to ten game', () => {
    vitest.useFakeTimers()

    let game: Game
    beforeEach(() => {
        game = new Game()
    })

    it("starts with zero score and value within 1..9", () => {
        const view = game.getView()

        expect(view.score).toBe(0)
        expect(view.value).toBeGreaterThanOrEqual(1)
        expect(view.value).toBeLessThanOrEqual(9)
    })

    it("increases score and updates value when correct answer is provided", () => {
        for (let i = 0; i < 10; i++) {
            const prevValue = game.getView().value
            game.answer(10 - prevValue)

            const view = game.getView()
            expect(view.score).toBeGreaterThan(0)
            expect(view.value).not.toBe(prevValue)
        }
    })

    // it("score is clamped to 100", () => {
    //     for (let i = 0; i < 10; i++) {
    //         game.tryAnswer(10 - game.value)
    //     }
    //
    //     for (let i = 0; i < 10; i++) {
    //         const prevValue = game.value
    //         game.tryAnswer(10 - prevValue)
    //         expect(game.score).toBe(100)
    //         expect(game.value).not.toBe(prevValue)
    //         expect(game.onError).not.toHaveBeenCalled()
    //     }
    // })
    //
    // it("doesn't increase score or updates value when incorrect answer is provided", () => {
    //     const prevValue = game.value
    //     const invalidAnswer = 11 - prevValue
    //
    //     game.tryAnswer(invalidAnswer)
    //     expect(game.score).toBe(0)
    //     expect(game.value).toBe(prevValue)
    //     expect(game.onError).toHaveBeenCalledOnce()
    //
    //     game.tryAnswer(invalidAnswer)
    //     expect(game.score).toBe(0)
    //     expect(game.value).toBe(prevValue)
    //     expect(game.onError).toHaveBeenCalledTimes(2)
    // })
    //
    // it("always has value from 1 to 9", () => {
    //     let values = [game.value]
    //     for (let i = 0; i < 100; i++) {
    //         game.tryAnswer(10 - game.value)
    //         values = [...values, game.value]
    //     }
    //     expect(Math.min(...values)).toBe(1)
    //     expect(Math.max(...values)).toBe(9)
    // })
    //
    // it("reduce score over time", () => {
    //     game.tryAnswer(10 - game.value)
    //     expect(game.score).toBe(10)
    //
    //     vitest.advanceTimersByTime(2000)
    //     expect(game.score).toBe(9)
    //
    //     vitest.advanceTimersByTime(2000)
    //     expect(game.score).toBe(8)
    // })
    //
    // it("gives score 95 for 1 answer per second and keeps it", () => {
    //     for (let i = 0; i < 20; i++) {
    //         game.tryAnswer(10 - game.value)
    //         vitest.advanceTimersByTime(1000)
    //     }
    //     expect(game.score).toBe(95)
    //
    //     for (let i = 0; i < 10; i++) {
    //         game.tryAnswer(10 - game.value)
    //         vitest.advanceTimersByTime(1000)
    //         expect(game.score).toBe(95)
    //     }
    // })
    //
    // it("gives score 45 for 1 answer per 2 seconds and keeps it", () => {
    //     for (let i = 0; i < 10; i++) {
    //         game.tryAnswer(10 - game.value)
    //         vitest.advanceTimersByTime(2000)
    //     }
    //     expect(game.score).toBe(45)
    //
    //     for (let i = 0; i < 5; i++) {
    //         game.tryAnswer(10 - game.value)
    //         vitest.advanceTimersByTime(2000)
    //         expect(game.score).toBe(45)
    //     }
    // })
})
