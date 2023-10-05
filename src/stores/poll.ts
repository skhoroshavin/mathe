import type {Subscriber} from "svelte/store";
import type {StopUpdater} from "../core/updater"
import {startUpdater} from "../core/updater";

export function poll<T>(fn: () => T) {
    const subscribers = new Set<Subscriber<T>>()
    let stopUpdater: StopUpdater

    function notify() {
        const value = fn()
        for(const sub of subscribers) {
            sub(value)
        }
    }

    return {
        subscribe: (sub: Subscriber<T>) => {
            sub(fn())

            subscribers.add(sub)
            if (subscribers.size == 1) {
                stopUpdater = startUpdater(notify)
            }

            return () => {
                subscribers.delete(sub)
                if (subscribers.size == 0) {
                    console.log("Stop updater")
                    stopUpdater()
                }
            }
        }
    }
}