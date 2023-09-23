
export class Game {
    _score = 0
    get score() { return this._score}

    _value = randomValue()
    get value() { return this._value }

    tryAnswer(v: number) {
        if(this.value + v != 10) {
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