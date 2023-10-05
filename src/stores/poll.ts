import {startUpdater} from "../core/updater";
import {observable} from "./observable";
import type {Readable} from "svelte/store";

export function poll<T>(fn: () => T): Readable<T> {
    return observable((emit) => {
        emit(fn())
        return startUpdater(() => {
            emit(fn())
        })
    })
}
