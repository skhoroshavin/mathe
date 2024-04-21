import {createSignal, JSXElement, onMount} from "solid-js";
import {Game} from "./core/game";
import Keypad from "./components/Keypad";
import Display from "./components/Display";

export default function App(): JSXElement {
    const [track, update] = createSignal(null, {equals: false})

    const game = new Game()
    const task = () => {
        track();
        return game.task
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
            <Display task={task()} score={score()} hasError={hasError()}/>
            <Keypad onClick={v => {
                game.answer(v)
                update(null)
            }}/>
        </>
    )
}