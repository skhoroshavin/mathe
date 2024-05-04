import {describe, it, vi, beforeAll, afterAll, expect, beforeEach, Mock} from "vitest";
import {startRenderLoop} from "./renderLoop.ts";

describe("startRenderLoop", () => {
    const start = 1000
    const period = 60
    let cb: Mock<[number], void>

    beforeAll(() => {
        vi.useFakeTimers()
        vi.stubGlobal("requestAnimationFrame", (cb: () => void) => {
            return setTimeout(cb, period)
        })
        vi.stubGlobal("cancelAnimationFrame", (id: number) => {
            clearTimeout(id)
        })
    })

    afterAll(() => {
        vi.useRealTimers()
        vi.unstubAllGlobals()
    })

    beforeEach(() => {
        vi.setSystemTime(start)
        cb = vi.fn()
    })

    it("doesn't trigger callback immediately", () => {
        startRenderLoop(cb)
        expect(cb).not.toHaveBeenCalled()
    })

    it("triggers callback eventually", () => {
        startRenderLoop(cb)
        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenLastCalledWith(start + period)
    })

    it("triggers callback repeatedly", () => {
        startRenderLoop(cb)

        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenLastCalledWith(start + period)

        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledTimes(2)
        expect(cb).toHaveBeenLastCalledWith(start + 2 * period)

        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledTimes(3)
        expect(cb).toHaveBeenLastCalledWith(start + 3 * period)
    })

    it("returns a function that can be used to stop triggers", () => {
        const stop = startRenderLoop(cb)

        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledOnce()
        expect(cb).toHaveBeenCalledWith(start + period)

        stop()
        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledOnce()

        vi.advanceTimersToNextTimer()
        expect(cb).toHaveBeenCalledOnce()
    })

    it("doesn't trigger callback at all if stopped before first trigger", () => {
        const stop = startRenderLoop(cb)

        stop()
        vi.advanceTimersToNextTimer()
        expect(cb).not.toHaveBeenCalled()
        vi.advanceTimersToNextTimer()
        expect(cb).not.toHaveBeenCalled()
    })

})