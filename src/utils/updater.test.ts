import type {Mock} from "vitest"
import {afterEach, beforeEach, describe, expect, it, vitest} from "vitest";
import {startUpdater} from "./updater";

describe("updater", () => {
    let advanceFrame: () => void
    let updater: Mock

    beforeEach(() => {
        advanceFrame = mockRequestAnimationFrame()
        updater = vitest.fn()
    })

    afterEach(() => {
        vitest.resetAllMocks()
    })

    it("doesn't call the updater on start", () => {
        startUpdater(updater)
        expect(updater).not.toHaveBeenCalled()
    })

    it("calls the updater when frames are updated", () => {
        startUpdater(updater)

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(1)

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(2)
    })

    it("no longer calls updater function after stop", () => {
        const stopUpdater = startUpdater(updater)

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(1)

        stopUpdater()

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(1)
    })

    it("can be stopped even before first update", () => {
        const stopUpdater = startUpdater(updater)
        stopUpdater()

        advanceFrame()
        expect(updater).not.toHaveBeenCalled()
    })

    it("is independent from other updaters", () => {
        startUpdater(updater)

        const other = vitest.fn()
        const stopOtherUpdater = startUpdater(other)

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(1)
        expect(other).toHaveBeenCalledTimes(1)

        stopOtherUpdater()

        advanceFrame()
        expect(updater).toHaveBeenCalledTimes(2)
        expect(other).toHaveBeenCalledTimes(1)
    })
})

function mockRequestAnimationFrame() {
    let currentHandle = 0
    let queued = new Map<number, () => void>()

    vitest.stubGlobal("requestAnimationFrame", (cb: () => void) => {
        queued.set(currentHandle, cb)
        return currentHandle++
    })

    vitest.stubGlobal("cancelAnimationFrame", (h: number) => queued.delete(h))

    return () => {
        const processed = Array.from(queued.entries())
        processed.forEach(([h, cb]) => {
            cb()
            queued.delete(h)
        })
    }
}