import {Point} from "./point.ts";
import {vec2} from "./vector.ts";
import {oneOf} from "../../game/core/random.ts";

export class Scene {
    constructor() {
        this._points = []
        for (let i = 0; i < 10; i++) {
            this._addPoint(Math.random() * 10)
        }
    }

    points() {
        return this._points
    }

    update(speed: number, now: number) {
        const dt = now - this._lastUpdate
        this._lastUpdate = now

        this._points.forEach(pt => pt.move(speed, dt))
        this._points = this._points.filter(pt => pt.isVisible())
        if (this._points.length < 10) {
            this._addPoint(10)
        }
    }

    private _points: Point[]
    private _id = 0
    private _lastUpdate = Date.now()

    private _addPoint(depth: number) {
        const x = Math.random() * 9 + 1
        const y = Math.random() * 9 + 1
        const sign = oneOf(signVectors)
        this._points.push(new Point(this._id, new vec2(x * sign.x, y * sign.y), depth))
        this._id++
    }
}

const signVectors = [
    new vec2(1, 1),
    new vec2(1, -1),
    new vec2(-1, 1),
    new vec2(-1, -1),
]