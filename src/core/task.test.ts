import {beforeEach, describe, expect, it} from "vitest";
import {Task, TaskResult} from "./task.ts"

describe("task", () => {
    describe("2 * 3 = _", () => {
        let task: Task
        beforeEach(() => {
            task = new Task("2 * 3 = ", "", "6")
        })

        it("should have correct text", () => {
            expect(task.text()).toBe("2 * 3 = _")
        })
        it("should succeed on correct input and update text", () => {
            expect(task.input(6)).toBe(TaskResult.Done)
            expect(task.text()).toBe("2 * 3 = 6")
        })
        it("should fail on wrong input and not change text", () => {
            expect(task.input(4)).toBe(TaskResult.Error)
            expect(task.text()).toBe("2 * 3 = _")
        })
    })

    describe("8 * _ = 56", () => {
        let task: Task
        beforeEach(() => {
            task = new Task("8 * ", " = 56", "7")
        })

        it("should have correct text", () => {
            expect(task.text()).toBe("8 * _ = 56")
        })
        it("should succeed on correct input and update text", () => {
            expect(task.input(7)).toBe(TaskResult.Done)
            expect(task.text()).toBe("8 * 7 = 56")
        })
        it("should fail on wrong input and not change text", () => {
            expect(task.input(6)).toBe(TaskResult.Error)
            expect(task.text()).toBe("8 * _ = 56")
        })
    })

    describe("6 * 4 = __", () => {
        let task: Task
        beforeEach(() => {
            task = new Task("6 * 4 = ", "", "24")
        })

        it("should have correct text", () => {
            expect(task.text()).toBe("6 * 4 = __")
        })
        it("should update text on first correct digit and ask for more", () => {
            expect(task.input(2)).toBe(TaskResult.More)
            expect(task.text()).toBe("6 * 4 = 2_")
        })
        it("should fail on first wrong digit and not change text", () => {
            expect(task.input(4)).toBe(TaskResult.Error)
            expect(task.text()).toBe("6 * 4 = __")
        })
        it("should succeed when given both correct digits", () => {
            expect(task.input(2)).toBe(TaskResult.More)
            expect(task.input(4)).toBe(TaskResult.Done)
            expect(task.text()).toBe("6 * 4 = 24")
        })
        it("should fail on one correct and one incorrect digit", () => {
            expect(task.input(2)).toBe(TaskResult.More)
            expect(task.input(5)).toBe(TaskResult.Error)
            expect(task.text()).toBe("6 * 4 = 2_")
        })
        it("should allow entering correct digit after incorrect", () => {
            expect(task.input(4)).toBe(TaskResult.Error)
            expect(task.input(2)).toBe(TaskResult.More)
            expect(task.text()).toBe("6 * 4 = 2_")
        })
    })


})