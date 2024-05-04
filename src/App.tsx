import {useCallback, useEffect, useRef, useState} from 'react'
import {Game} from "./game/game.ts";
import Display from "./components/Display.tsx";
import Keypad from "./components/Keypad.tsx";

export default function App() {
    const [task, setTask] = useState("")
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(0)
    const [error, setError] = useState(false)
    const [now, setNow] = useState(Date.now())

    const game = useRef(new Game())
    const answer = useCallback((v: number) => game.current.answer(v), [])

    useEffect(() => {
        let frame: number

        function tick() {
            game.current.update()
            setTask(game.current.task)
            setScore(game.current.score)
            setLevel(game.current.level)
            setError(game.current.hasError)
            setNow(Date.now())
            frame = requestAnimationFrame(tick)
        }

        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    })

    return <>
        <Display task={task} score={score} level={level} hasError={error} now={now}/>
        <Keypad onClick={answer}/>
    </>
}
