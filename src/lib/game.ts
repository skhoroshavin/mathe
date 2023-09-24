
export class Game {
    constructor() {
        setInterval(() => {
            const newScore = this._score - 0.025
            this._score = Math.max(0, newScore)
        }, 50)
    }

    _score = 0
    get score() { return this._score}

    _value = randomValue()
    get value() { return this._value }

    onError?: () => void

    tryAnswer(v: number) {
        if(this.value + v != 10) {
            if (this.onError != null) {
                this.onError()
            }
            return
        }

        this._score += 1
        const prevValue = this._value
        do {
            this._value = randomValue()
        } while (this._value == prevValue)
    }
}

const randomValue = () => {
    return 1 + Math.floor(Math.random()*9)
}