import {readable} from "svelte/store";

export function makeTimer() {
    return readable(Date.now(), (set) => {
        let handle: number | undefined
        let active = true

        const tick = () => {
            if (!active) return
            set(Date.now())
            handle = requestAnimationFrame(tick)
        }
        tick()

        return () => {
            active = false
            if (handle != undefined) {
                cancelAnimationFrame(handle)
            }
        }
    })
}
