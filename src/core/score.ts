export class Score {

    get() {
        return Math.round(this._value * 10) / 10
    }

    addCorrect() {
        this._increment(22.5)
    }

    addMistake() {
        this._increment(-5)
    }

    update(elapsedMillis: number) {
        this._value *= Math.exp(-0.000219 * elapsedMillis)
    }

    private _increment(value: number) {
        this._value += value
        if (this._value < 0) this._value = 0
        if (this._value > 100) this._value = 100
    }

    private _value = 0
}
