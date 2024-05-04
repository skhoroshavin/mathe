export type RenderCallback = (now: number) => void

export const startRenderLoop = (cb: RenderCallback): () => void => {
    let frame = 0
    const tick = () => {
        cb(Date.now())
        frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
}
