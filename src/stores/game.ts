import type {Readable} from "svelte/store";
import {Game} from "../core/game";
import {poll} from "../utils/poll";

export function makeGame(): Readable<Game> {
    const game = new Game()
    return poll(() => {
        game.update()
        return game
    })
}
