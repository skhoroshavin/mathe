import type {Subscriber} from "svelte/store";

type Emitter<T> = (event: T) => void
type Starter<T> = (emit: Emitter<T>) => Stopper
type Stopper = () => void

export function observable<T>(start: Starter<T>) {
    const subscribers = new Set<Subscriber<T>>()
    let stop: Stopper | undefined
    let lastEvent: T | undefined

    function emit(e: T) {
        lastEvent = e
        for(const sub of subscribers) {
            sub(e)
        }
    }

    return {
        subscribe: (sub: Subscriber<T>) => {
            if (lastEvent != undefined) {
                sub(lastEvent)
            }

            subscribers.add(sub)
            if (subscribers.size == 1) {
                stop = start(emit)
            }

            return () => {
                subscribers.delete(sub)
                if (subscribers.size == 0) {
                    stop!()
                }
            }
        }
    }
}