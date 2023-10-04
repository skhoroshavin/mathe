export class Game {
    _answers: number[] = []
    onError?: () => void

    _value = randomValue()

    get value() {
        return this._value
    }

    get score(): number {
        let res = 0
        const now = Date.now()
        let filteredAnswers: number[] = []
        for (const v of this._answers) {
            const elapsedSeconds = (now - v) / 1000
            const score = Math.max(0, 10 - 0.5 * elapsedSeconds)
            if (score > 0) {
                filteredAnswers = [...filteredAnswers, v]
            }
            res += score
        }
        this._answers = filteredAnswers
        res = Math.max(0, res)
        res = Math.min(100, res)
        return res
    }

    tryAnswer(v: number) {
        if (this.value + v != 10) {
            if (this.onError != null) {
                this.onError()
            }
            return
        }

        this._answers = [...this._answers, Date.now()]
        const prevValue = this._value
        do {
            this._value = randomValue()
        } while (this._value == prevValue)
    }

    get state(): GameState {
        return {
            value: this.value,
            score: this.score,
        }
    }

    tick() {
        const state = this.state
        this._subscribers.forEach(sub => sub(state))
    }
    subscribe(sub: GameSubscriber) {
        this._subscribers.add(sub)
        sub(this.state)
        return () => {
            this._subscribers.delete(sub)
        }
    }
    private readonly _subscribers = new Set<GameSubscriber>()
}

interface GameState {
    value: number
    score: number
}

type GameSubscriber = (s: GameState) => void

const randomValue = () => {
    return 1 + Math.floor(Math.random() * 9)
}