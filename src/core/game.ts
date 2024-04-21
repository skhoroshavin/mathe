import {Score} from "./score.ts";
import {oneOf, someInteger} from "./random.ts";
import {Task, TaskResult} from "./task.ts";

export class Game {
    get task(): string {
        return this._task.text()
    }

    get score(): number {
        return this._score.get()
    }

    get hasError(): boolean {
        return (this._lastUpdate - this._hasError) < 500
    }

    answer(value: number) {
        switch (this._task.input(value)) {
            case TaskResult.Done:
                this._score.addCorrect()
                this._task = randomTask()
                break
            case TaskResult.Error:
                this._score.addMistake()
                this._hasError = Date.now()
                break
            default:
                break
        }
    }

    update() {
        const now = Date.now()
        const elapsedMillis = now - this._lastUpdate
        this._score.update(elapsedMillis)
        this._lastUpdate = now
    }

    private _lastUpdate = Date.now()
    private _task = randomTask()
    private _score = new Score()
    private _hasError = 0
}

const randomTask = () => {
    let a = oneOf([1, 2, 3, 4, 6, 7, 8, 9])
    let b = oneOf([2, 4, 8])
    const c = a * b
    if (someInteger(2) > 0) {
        const x = a
        a = b
        b = x
    }
    return new Task(`${a} * ${b} = `, "", c.toString())
}
