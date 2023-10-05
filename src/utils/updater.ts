export type Updater = () => void
export type StopUpdater = () => void

export function startUpdater(cb: Updater): StopUpdater {
    let h = requestAnimationFrame(update)

    function update() {
        cb()
        h = requestAnimationFrame(update)
    }

    return () => cancelAnimationFrame(h)
}
