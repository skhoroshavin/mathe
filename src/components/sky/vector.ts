export class vec2 {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    toString(): string {
        return `${this.x} ${this.y}`
    }

    add(other: vec2): vec2 {
        return new vec2(this.x + other.x, this.y + other.y)
    }

    sub(other: vec2): vec2 {
        return new vec2(this.x - other.x, this.y - other.y)
    }

    mul(a: number): vec2 {
        return new vec2(a * this.x, a * this.y)
    }

    norm(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    normalized(): vec2 {
        return this.mul(1.0 / this.norm())
    }
}
