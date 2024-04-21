export function someInteger(max: number): number {
    return Math.floor(Math.random() * max)
}

export function oneOf<T>(vals: T[]): T {
    return vals[someInteger(vals.length)]
}
