import {Point} from "./point.ts";
import {vec2} from "./vector.ts";

const depthMax = 10
const depthStep = 0.8

export class Scene {
    constructor() {
        this._addPoints()
    }

    points() {
        return this._points
    }

    update(speed: number, now: number, hyperspace: boolean) {
        const dt = now - this._lastUpdate
        this._lastUpdate = now
        this._unseededSpace += speed * dt

        this._points.forEach(pt => pt.move(speed, dt, hyperspace))
        this._points = this._points.filter(pt => pt.isVisible())
        this._addPoints()
    }

    private _points: Point[] = []
    private _id = 0
    private _unseededSpace = 10
    private _lastUpdate = Date.now()

    private _addPoints() {
        while (this._unseededSpace > depthStep) {
            const r = Math.random() * 28 + 2
            const phi = Math.random() * 2 * Math.PI
            const x = r * Math.sin(phi)
            const y = r * Math.cos(phi)
            const depthMin = depthMax - Math.floor(this._unseededSpace / depthStep) * depthStep
            const depth = depthMin + Math.random() * depthStep
            this._points.push(new Point(this._id, new vec2(x, y), depth))
            this._id++
            this._unseededSpace -= depthStep
        }
    }
}
