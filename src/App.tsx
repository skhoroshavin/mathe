import {useCallback, useEffect, useRef, useState} from 'react'
import {Game} from "./game/game.ts";
import Display from "./components/Display.tsx";
import Keypad from "./components/Keypad.tsx";

const defaultState = {
    task: "",
    score: 0,
    level: 0,
    error: false,
    now: Date.now()
}

export default function App() {
    const [state, setState] = useState(defaultState)

    const game = useRef(new Game())
    const answer = useCallback((v: number) => game.current.answer(v), [])

    useEffect(() => {
        let frame: number

        function tick() {
            game.current.update()
            setState({
                task: game.current.task,
                score: game.current.score,
                level: game.current.level,
                error: game.current.hasError,
                now: Date.now()
            })
            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [])

    return <>
        <Display task={state.task} score={state.score} level={state.level} hasError={state.error} now={state.now}/>
        <Keypad onClick={answer}/>
    </>
}
