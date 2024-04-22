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

const randomTask = (): Task => {
    const a = oneOf([1, 2, 3, 4, 6, 7, 8, 9])
    const b = oneOf([2, 4, 8])
    const c = a * b
    switch (someInteger(13)) {
        case 0:
            return new Task(`${a} * ${b} = ?`, c.toString())
        case 1:
            return new Task(`${b} * ${a} = ?`, c.toString())
        case 2:
            return new Task(`${c} : ${a} = ?`, b.toString())
        case 3:
            return new Task(`${c} : ${b} = ?`, a.toString())
        case 4:
            return new Task(`${a} * ? = ${c}`, b.toString())
        case 5:
            return new Task(`${b} * ? = ${c}`, a.toString())
        case 6:
            return new Task(`${c} : ? = ${a}`, b.toString())
        case 7:
            return new Task(`${c} : ? = ${b}`, a.toString())
        case 8:
            return new Task(`? * ${b} = ${c}`, a.toString())
        case 9:
            return new Task(`? * ${a} = ${c}`, b.toString())
        case 10:
            return new Task(`? : ${b} = ${a}`, c.toString())
        case 11:
            return new Task(`? : ${a} = ${b}`, c.toString())
        case 12:
            return new Task(`${a} * ${a} = ?`, (a * a).toString())
    }
    throw Error("should never get there")
}
