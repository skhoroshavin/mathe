import styles from './Starsky.module.css'
import {CSSProperties, useRef} from "react";
import {Star} from "./Star.tsx";
import {vec2} from "./vector.ts";

interface Props {
    color: string
    speed: number
    now: number
}

export default function Starsky(props: Props) {
    const sceneRef = useRef<Scene>()
    if (sceneRef.current == null) {
        sceneRef.current = new Scene()
    }

    const scene = sceneRef.current
    scene.update(props.speed, props.now)

    return <svg width="100%" height="100%" viewBox="0 0 100 100"
                className={styles.container} style={{"--star-color": props.color} as CSSProperties}>
        {scene.points.map((p, i) =>
            <Star key={i} color={props.color} p0={p.p} r0={0.5} p1={p.pn} r1={0.5}/>)}
    </svg>
}

class Scene {
    constructor() {
        this._points = []
        for (let i = 0; i < 10; i++) {
            this._points.push(new Point())
        }
    }

    get points() {
        return this._points
    }

    update(speed: number, now: number) {
        const dt = now - this._lastUpdate
        this._lastUpdate = now

        this._points.forEach(star => star.update(speed, dt))
        this._points = this._points.filter(star => !star.isDead)
        while (this._points.length < 10) {
            this._points.push(new Point())
        }
    }

    private _points: Point[]
    private _lastUpdate = Date.now()
}

class Point {
    constructor() {
        // Normalized starting position
        const np = new vec2(Math.random() - 0.5, Math.random() - 0.5)

        // Starting position
        this.p = new vec2(50 + 100 * np.x, 50 + 100 * np.y)

        // Starting velocity
        const vel = Math.random()
        this.v = np.normalized().mul(vel)
    }

    get isDead(): boolean {
        if (this.p.x < -100) return true
        if (this.p.y < -100) return true
        if (this.p.x > 200) return true
        return this.p.y > 200;
    }

    update(speed: number, dt: number) {
        const move = speed * dt * 0.0005
        this.p = this.p.add(this.v.mul(move))
        this.v = this.v.mul(1 + 0.2 * move)
    }

    p: vec2
    private v: vec2

    get pn() {
        const vn = new vec2(
            normSpeed(this.v.x),
            normSpeed(this.v.y)
        )
        return this.p.add(vn)
    }

}

function normSpeed(v: number): number {
    let vn = 0.8 * v
    if (vn > 0 && vn < 0.5) vn = 0.5
    if (vn < 0 && vn > -0.5) vn = -0.5
    return vn
}