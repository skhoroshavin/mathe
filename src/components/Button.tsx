import style from './Button.module.css'
import {useCallback, useState} from "react";

interface Props {
    value: number
    onClick: (v: number) => void
}

export default function Button(props: Props) {
    const [active, setActive] = useState(false)

    const activate = useCallback(() => setActive(true), [])
    const deactivate = useCallback(() => setActive(false), [])

    return <div className={style.container}>
        <button onClick={() => props.onClick(props.value)}
                onMouseDown={activate} onMouseUp={() => setTimeout(deactivate, 50)}
                onTouchStart={activate} onTouchEnd={deactivate}
                className={`${style.button} ${active ? style.active : ""}`}>
            {props.value}
        </button>
    </div>
}