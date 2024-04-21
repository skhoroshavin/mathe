export enum TaskResult {
    Done,
    Error,
    More
}

export class Task {
    constructor(start: string, end: string, expectedResults: string) {
        this._start = start
        this._end = end
        this._expectedResult = expectedResults
        this._correctDigits = 0
    }

    text(): string {
        return `${this._start}${this._result()}${this._end}`
    }

    input(v: number): TaskResult {
        if (v.toString() != this._expectedResult[this._correctDigits]) {
            return TaskResult.Error
        }
        this._correctDigits++
        if (this._correctDigits == this._expectedResult.length) {
            return TaskResult.Done
        } else {
            return TaskResult.More
        }
    }

    private _result(): string {
        let res = ""
        for (let i = 0; i != this._expectedResult.length; ++i) {
            if (i < this._correctDigits) {
                res += this._expectedResult[i]
            } else {
                res += "_"
            }
        }
        return res
    }

    private _start: string
    private _end: string
    private _expectedResult: string
    private _correctDigits: number
}