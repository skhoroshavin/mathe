
import {Score} from "./score";

export interface GameView {
    value: number
    score: number
    error: boolean
}

export class Game {
    getView(): GameView {
        this.update()
        return {
            value: this._value,
            score: this._score.get(),
            error: (this._lastUpdate - this._error) < 500,
        }
    }

    answer(value: number) {
        if (this._value + value != 10) {
            this._score.addMistake()
            this._error = Date.now()
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
    private _error = 0
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
