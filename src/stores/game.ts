import type {Readable} from "svelte/store";
import {derived, readable, writable} from "svelte/store";
import type {GameView} from "../core/game";
import {answer, makeGameState, makeGameView} from "../core/game";
import {startUpdater} from "../core/updater";

export interface GameStore extends Readable<GameView> {
    answer(v: number): void,
}

export function makeGame(): GameStore {
    const state = writable(makeGameState())
    const timer = readable(Date.now(), (set) => startUpdater(() => {
        set(Date.now())
    }))
    const {subscribe} = derived(
        [state, timer],
        ([state, timer]) => makeGameView(state, timer)
    )
    return {
        subscribe,
        answer: (v: number) => state.update(state => answer(state, v, Date.now())),
    }
}