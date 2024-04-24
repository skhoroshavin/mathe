import {createSignal, JSXElement, onMount} from "solid-js";
import Keypad from "./components/Keypad";
import Display from "./components/Display";
import {Game} from "./game/game.ts";

export default function App(): JSXElement {
    const [track, update] = createSignal(null, {equals: false})

    const game = new Game()
    const task = () => {
        track();
        return game.task
    }
    const level = () => {
        track()
        return game.level
    }
    const score = () => {
        track();
        return game.score
    }
    const hasError = () => {
        track();
        return game.hasError
    }

    onMount(() => {
        function tick() {
            game.update()
            update(null)
            requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
    })

    return (
        <>
            <Display task={task()} level={level()} score={score()} hasError={hasError()}/>
            <Keypad onClick={v => {
                game.answer(v)
                update(null)
            }}/>
        </>
    )
}