import {vec2} from "./vector.ts";

const focalLength = 0.3
const motionBlurMilliseconds = 60

export class Point {
    constructor(id: number, xy: vec2, z: number) {
        this.id = id
        this.xy = xy
        this.z = z

        this.prevZ = z
        this.prevDT = 0

        this.updateProjection()
    }

    isVisible() {
        return visible(this.p0, this.z) || visible(this.p1, this.prevZ)
    }

    move(speed: number, dt: number) {
        const nextZ = this.z - speed * dt
        if (dt > motionBlurMilliseconds) {
            this.z = nextZ
            this.prevZ = nextZ + speed * motionBlurMilliseconds
            this.prevDT = motionBlurMilliseconds
            return
        }

        const oldDT = motionBlurMilliseconds - dt
        if (oldDT > this.prevDT) {
            this.z = nextZ
            this.prevDT += dt
            return
        }

        this.prevZ = this.z + (this.prevZ - this.z) * (oldDT / this.prevDT)
        this.prevDT = motionBlurMilliseconds
        this.z = nextZ

        this.updateProjection()
    }

    private updateProjection() {
        this.p0 = this.xy.mul(focalLength / (focalLength + Math.max(0, this.z)))
        this.p1 = this.xy.mul(focalLength / (focalLength + Math.max(0, this.prevZ)))
    }

    id: number
    p0: vec2 = new vec2(0, 0)
    p1: vec2 = new vec2(0, 0)
    private xy: vec2
    private z: number
    private prevZ: number
    private prevDT: number
}

const visible = (p: vec2, z: number) => {
    if (z < 0) return false
    if (p.x < -2) return false
    if (p.x > 2) return false
    if (p.y < -2) return false
    if (p.y > 2) return false
    return true
}
