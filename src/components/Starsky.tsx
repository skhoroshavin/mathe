import styles from './Starsky.module.css'

import {createEffect, createSignal, JSXElement} from "solid-js";

interface Props {
    speed: number,
    now: number
}

export default function Starsky(props: Props): JSXElement {
    let stars = new StarField()

    let prev = props.now
    createEffect(() => {
        stars.update(props.speed, props.now - prev)
        prev = props.now
    })

    return <svg width="100%" height="100%" viewBox="0 0 100 100" class={styles.container}>
        {stars.stars.map(star => <path d={star.path} stroke="#7f7f7f" stroke-width="0.05rem"/>)}
    </svg>
}

class StarField {
    constructor() {
        this._stars = []
        for (let i = 0; i < 10; i++) {
            this._stars.push(new Star())
        }
    }

    get stars() {
        this._signal[0]()
        return this._stars
    }

    update(speed: number, dt: number) {
        this._stars.forEach(star => star.update(speed, dt))
        this._stars = this._stars.filter(star => !star.isDead)
        while (this._stars.length < 10) {
            this._stars.push(new Star())
        }
        this._signal[1](null)
    }

    private _stars: Star[]
    private readonly _signal = createSignal(null, {equals: false})
}

class Star {
    constructor() {
        // Normalized starting position
        const npx = Math.random() - 0.5
        const npy = Math.random() - 0.5

        // Starting position
        this._px = 50 + 100 * npx
        this._py = 50 + 100 * npy

        // Starting velocity
        const vel = Math.random()
        this._vx = npx * vel / Math.sqrt(npx * npx + npy * npy)
        this._vy = npy * vel / Math.sqrt(npx * npx + npy * npy)
    }

    get path(): string {
        return `M ${this._px} ${this._py} L ${this._pxn} ${this._pyn}`
    }

    get isDead(): boolean {
        if (this._px < -100) return true
        if (this._py < -100) return true
        if (this._px > 200) return true
        return this._py > 200;
    }

    update(speed: number, dt: number) {
        const move = speed * dt * 0.0005
        this._px += move * this._vx
        this._py += move * this._vy
        this._vx *= 1 + 0.2 * move
        this._vy *= 1 + 0.2 * move
    }

    private _px: number
    private _py: number
    private _vx: number
    private _vy: number

    get _pxn() {
        return this._px + normSpeed(this._vx)
    }

    get _pyn() {
        return this._py + normSpeed(this._vy)
    }
}

function normSpeed(v: number): number {
    let vn = 0.8 * v
    if (vn > 0 && vn < 0.5) vn = 0.5
    if (vn < 0 && vn > -0.5) vn = -0.5
    return vn
}