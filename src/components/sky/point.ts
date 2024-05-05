import {vec2} from "./vector.ts";

const focalLength = 1
const motionBlurMilliseconds = 100

export class Point {
    constructor(id: number, xy: vec2, z: number) {
        this.id = id
        this.xy = xy
        this.z = z

        this.prevZ = z
        this.prevDT = 0

        this.project()
    }

    isVisible() {
        if ((this.z < 0) && (this.prevZ < 0)) {
            return false
        }
        if (((this.p0.x < -1) || (this.p0.x > 1)) &&
            ((this.p1.x < -1) || (this.p1.x > 1))) {
            return false
        }
        if (((this.p0.y < -1) || (this.p0.y > 1)) &&
            ((this.p1.y < -1) || (this.p1.y > 1))) {
            return false
        }
        return true
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

        this.project()
    }

    private project() {
        this.p0 = this.xy.mul(focalLength / (focalLength + this.z))
        this.p1 = this.xy.mul(focalLength / (focalLength + this.prevZ))
    }

    id: number
    p0: vec2 = new vec2(0, 0)
    p1: vec2 = new vec2(0, 0)
    private xy: vec2
    private z: number
    private prevZ: number
    private prevDT: number
}