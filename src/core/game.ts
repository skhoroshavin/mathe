
import {Score} from "./score";

export class Game {
    get value(): number { return this._value }
    get score(): number { return this._score.get() }
    get hasError(): boolean { return (this._lastUpdate - this._hasError) < 500 }

    answer(value: number) {
        if (this._value + value != 10) {
            this._score.addMistake()
            this._hasError = Date.now()
            return
        }

        this._score.addCorrect()
        this._value = newValue(this._value)
    }

    update() {
        const now = Date.now()
        const elapsedMillis = now - this._lastUpdate
        this._score.update(elapsedMillis)
        this._lastUpdate = now
    }

    private _lastUpdate = Date.now()
    private _value = randomValue()
    private _score = new Score()
    private _hasError = 0
}

function newValue(prev: number): number {
    let next
    do { next = randomValue() }
    while (next == prev)
    return next
}

const randomValue = () => {
    return 1 + Math.floor(Math.random() * 9)
}
