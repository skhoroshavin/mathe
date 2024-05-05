import {Point} from "./point.ts";
import {vec2} from "./vector.ts";
import {oneOf} from "../../game/core/random.ts";

export class Scene {
    constructor() {
        this._addPoints()
    }

    points() {
        return this._points
    }

    update(speed: number, now: number) {
        const dt = now - this._lastUpdate
        this._lastUpdate = now
        this._pointsNeeded += speed * dt

        this._points.forEach(pt => pt.move(speed, dt))
        this._points = this._points.filter(pt => pt.isVisible())
        this._addPoints()
    }

    private _points: Point[] = []
    private _id = 0
    private _pointsNeeded = 10
    private _lastUpdate = Date.now()

    private _addPoints() {
        while (this._pointsNeeded > 1) {
            const x = Math.random() * 8 + 2
            const y = Math.random() * 8 + 2
            const sign = oneOf(signVectors)
            const depth = 10 - Math.floor(this._pointsNeeded) - Math.random()
            this._points.push(new Point(this._id, new vec2(x * sign.x, y * sign.y), depth))
            this._id++
            this._pointsNeeded -= 1
        }
    }
}

const signVectors = [
    new vec2(1, 1),
    new vec2(1, -1),
    new vec2(-1, 1),
    new vec2(-1, -1),
]