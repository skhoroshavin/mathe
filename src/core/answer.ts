
export interface Answer {
    score(now: number): number
}

export function makeRightAnswer(now: number): Answer {
    return new _answer(now, 10, 20)
}

export function makeWrongAnswer(now: number): Answer {
    return new _answer(now, -20, 40)
}

class _answer implements Answer {
    constructor(now: number, score: number, durationSeconds: number) {
        this._timestamp = now
        this._score = score
        this._coolDownSpeed = 1.0 / durationSeconds
    }

    score(now: number): number {
        const elapsedSeconds = (now - this._timestamp) / 1000
        return this._score * Math.max(0, 1 - elapsedSeconds * this._coolDownSpeed)
    }

    private readonly _timestamp: number
    private readonly _score: number
    private readonly _coolDownSpeed: number
}
