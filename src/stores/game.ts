import type {Readable} from "svelte/store";
import type {GameView} from "../core/game";
import {Game} from "../core/game";
import {poll} from "../utils/poll";

export interface GameStore extends Readable<GameView> {
    answer(v: number): void,
}

export function makeGame(): GameStore {
    const game = new Game()
    const {subscribe} = poll(() => game.getView())
    return {
        subscribe,
        answer: v => game.answer(v),
    }
}
