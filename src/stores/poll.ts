import {startUpdater} from "../core/updater";
import {observable} from "./observable";

export function poll<T>(fn: () => T) {
    return observable((emit) => {
        emit(fn())
        return startUpdater(() => {
            emit(fn())
        })
    })
}
