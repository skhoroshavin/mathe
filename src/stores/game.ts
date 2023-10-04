import type {Readable} from "svelte/store";
import type {GameView} from "../core/game";

import {derived, writable} from "svelte/store";
import {answer, makeGameState, makeGameView} from "../core/game";
import {makeTimer} from "./timer";

export interface GameStore extends Readable<GameView> {
    answer(v: number): void,
}

export function makeGame(): GameStore {
    const state = writable(makeGameState())
    const timer = makeTimer()
    const { subscribe } = derived(
        [state, timer],
        ([state, timer]) => makeGameView(state, timer)
    )
    return {
        subscribe,
        answer: (v: number) => state.update(state => answer(state, v, Date.now())),
    }
}