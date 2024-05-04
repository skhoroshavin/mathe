import {Score} from "./core/score";
import {TaskResult} from "./core/task.ts";
import {createTask} from "./create_task.ts";

export class Game {
    get task(): string {
        return this._task.text()
    }

    get level(): number {
        return 100 * this._complexity / 16
    }

    get score(): number {
        return this._score.get()
    }

    get hasError(): boolean {
        return (this._lastUpdate - this._hasError) < 500
    }

    answer(value: number) {
        switch (this._task.input(value)) {
            case TaskResult.Done: {
                this._score.addCorrect()
                if (this._score.get() >= 100) {
                    this._score.reset()
                    if (this._complexity < 16) {
                        this._complexity += 1
                    }
                }
                const oldTask = this._task
                do {
                    this._task = createTask(this._complexity)
                } while (this._task.equals(oldTask))
                break
            }
            case TaskResult.Error: {
                this._score.addMistake()
                this._hasError = Date.now()
                break
            }
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
    private _task = createTask(0)
    private _complexity = 0
    private _score = new Score()
    private _hasError = 0
}
