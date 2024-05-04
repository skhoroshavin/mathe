import {useCallback, useEffect, useRef, useState} from 'react'
import {Game} from "./game/game.ts";
import Display from "./components/Display.tsx";
import Keypad from "./components/Keypad.tsx";
import {startRenderLoop} from "./utils/renderLoop.ts";

const defaultState = {
    task: "",
    score: 0,
    level: 0,
    error: false,
    now: Date.now()
}

export default function App() {
    const [state, setState] = useState(defaultState)

    const gameRef = useRef<Game>()
    if (gameRef.current == null) {
        gameRef.current = new Game()
    }

    const answer = useCallback((v: number) => gameRef.current!.answer(v), [])

    useEffect(() => {
        return startRenderLoop(now => {
            const game = gameRef.current!
            game.update()
            setState({
                task: game.task,
                score: game.score,
                level: game.level,
                error: game.hasError,
                now: now
            })
        })
    }, [])

    return <>
        <Display task={state.task} score={state.score} level={state.level} hasError={state.error} now={state.now}/>
        <Keypad onClick={answer}/>
    </>
}
