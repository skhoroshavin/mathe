import Keypad from "./components/Keypad.tsx";
import Display from "./components/Display.tsx";
import {Game} from "./core/game.ts";
import {createSignal} from "solid-js";

import type {JSXElement} from "solid-js";

export default function App(): JSXElement {
    const [track, update] = createSignal(null, {equals: false} )

    const game = new Game()
    const value = () => {track(); return game.value.toString()}
    const score = () => {track(); return game.score}
    const hasError = () => {track(); return game.hasError}

    function tick() {
        game.update()
        update(null)
        requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    return (
        <>
            <Display value={value()} score={score()} hasError={hasError()}/>
            <Keypad onClick={v => {
                game.answer(v)
                update(null)
            }}/>
        </>
    )
}