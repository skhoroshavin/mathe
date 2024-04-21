import {afterEach, beforeEach, describe, expect, it, vi} from "vitest";
import {Score} from "./score.ts";

describe("score", () => {
    let score: Score

    beforeEach(() => {
        vi.useFakeTimers()
        score = new Score()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it("is initially 0", () => {
        expect(score.get()).toBe(0)
    })

    it("correct answers increase the score", () => {
        score.addCorrect()
        expect(score.get()).toBeGreaterThan(0)
        const firstCorrect = score.get()

        score.addCorrect()
        expect(score.get()).toBeGreaterThan(firstCorrect)
    })

    it("incorrect answers decrease the score", () => {
        score.addCorrect()
        score.addCorrect()
        score.addCorrect()
        const onlyCorrect = score.get()

        score.addMistake()
        expect(score.get()).toBeLessThan(onlyCorrect)
        const firstIncorrect = score.get()

        score.addMistake()
        expect(score.get()).toBeLessThan(firstIncorrect)
    })

    it("can never become below zero", () => {
        score.addMistake()
        expect(score.get()).toBe(0)

        score.addCorrect()
        expect(score.get()).toBeGreaterThan(0)

        for (let i = 0; i < 10; i++) {
            score.addMistake()
        }
        expect(score.get()).toBe(0)

        score.addCorrect()
        expect(score.get()).toBeGreaterThan(0)
    })

    it("can never become higher than 100", () => {
        for (let i = 0; i < 200; i++) {
            score.addCorrect()
        }
        expect(score.get()).toBe(100)
    })
    
    it("decreases over time", () => {
        score.addCorrect()
        const initialScore = score.get()

        score.update(1000)
        expect(score.get()).toBeLessThan(initialScore)
    })

    it("slows down decrease speed over time", () => {
        score.addCorrect()
        const initialScore = score.get()
        score.update(1000)
        const scoreAfterSecond = score.get()
        score.update(1000)
        const scoreAfterTwoSeconds = score.get()

        const firstSecondDecrease = initialScore - scoreAfterSecond
        const secondSecondDecrease = scoreAfterSecond - scoreAfterTwoSeconds

        expect(secondSecondDecrease).toBeLessThan(firstSecondDecrease)
    })

    it("decrease speed doesn't depend on update rate", () => {
        score.addCorrect()
        score.update(1000)
        const scoreAfterSingleUpdate = score.get()

        score = new Score()
        score.addCorrect()
        for (let i = 0; i < 10; i++) {
            score.update(100)
        }
        expect(score.get()).toBeCloseTo(scoreAfterSingleUpdate)
    })

    it("can reach 100 in 10 seconds if correct answer is added every second", () => {
        for (let i = 0; i < 9; i++) {
            score.update(1000)
            score.addCorrect()
            expect(score.get()).toBeLessThan(100)
        }

        score.update(1000)
        score.addCorrect()
        expect(score.get()).toBe(100)
    })

    it("maintains value around 50 if correct answer is added every two seconds", () => {
        for (let i = 0; i < 100; i++) {
            score.addCorrect()
            score.update(2000)
        }

        for (let i = 0; i < 10; i++) {
            score.addCorrect()
            score.update(1000)
            expect(score.get()).toBeGreaterThanOrEqual(49)
            expect(score.get()).toBeLessThanOrEqual(51)
            score.update(1000)
        }
    })
})
