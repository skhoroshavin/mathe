import {Score} from "./score.ts";
import {TaskResult} from "./task.ts";
import {createTask} from "./task_factory.ts";

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
                this._task = createTask(0)
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
    private _task = createTask(0)
    private _score = new Score()
    private _hasError = 0
}
