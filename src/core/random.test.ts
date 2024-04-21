import {describe, expect, it} from "vitest";
import {oneOf, someInteger} from "./random.ts";

describe("someInteger", () => {
    it("someInteger(0) can only return 0", () => {
        for (let i = 0; i != 1000; ++i) {
            expect(someInteger(0)).toBe(0)
        }
    })

    it("someInteger(1) can only return 0", () => {
        for (let i = 0; i != 1000; ++i) {
            expect(someInteger(1)).toBe(0)
        }
    })

    it("someInteger(2) can only return 0 or 1", () => {
        let values = new Set<number>()
        for (let i = 0; i != 1000; ++i) {
            values.add(someInteger(2))
        }

        expect(values.has(0)).toBeTruthy()
        expect(values.has(1)).toBeTruthy()
        expect(values.size).toBe(2)
    })

    it("someInteger(5) can only return 0, 1, 2, 3 or 4", () => {
        let values = new Set<number>()
        for (let i = 0; i != 1000; ++i) {
            values.add(someInteger(5))
        }

        expect(values.has(0)).toBeTruthy()
        expect(values.has(1)).toBeTruthy()
        expect(values.has(2)).toBeTruthy()
        expect(values.has(3)).toBeTruthy()
        expect(values.has(4)).toBeTruthy()
        expect(values.size).toBe(5)
    })
})

describe("oneOf", () => {
    it(`oneOf(["a", "b"]) can only return "a" or "b"`, () => {
        let values = new Set<string>()
        for (let i = 0; i != 1000; ++i) {
            values.add(oneOf(["a", "b"]))
        }

        expect(values.has("a")).toBeTruthy()
        expect(values.has("b")).toBeTruthy()
        expect(values.size).toBe(2)
    })

    it(`oneOf([2, 8, 4]) can only return 2, 4 or 8`, () => {
        let values = new Set<number>()
        for (let i = 0; i != 1000; ++i) {
            values.add(oneOf([2, 8, 4]))
        }

        expect(values.has(2)).toBeTruthy()
        expect(values.has(4)).toBeTruthy()
        expect(values.has(8)).toBeTruthy()
        expect(values.size).toBe(3)
    })

})