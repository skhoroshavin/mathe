import style from './Button.module.css'
import {useCallback, useEffect, useState} from "react";

interface Props {
    value: number
    onClick: (v: number) => void
}

export default function Button({value, onClick}: Props) {
    const [active, setActive] = useState(false)

    const activate = useCallback(() => setActive(true), [])
    const deactivate = useCallback(() => setTimeout(() => setActive(false), 50), [])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key == value.toString()) {
            activate()
            onClick(value)
            deactivate()
        }
    }, [activate, deactivate, onClick, value])

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown)
        return () => document.removeEventListener("keydown", onKeyDown)
    }, [onKeyDown]);

    return <div className={style.container}>
        <button onClick={() => onClick(value)}
                onMouseDown={activate} onMouseUp={deactivate}
                onTouchStart={activate} onTouchEnd={deactivate}
                className={`${style.button} ${active ? style.active : ""}`}>
            {value}
        </button>
    </div>
}