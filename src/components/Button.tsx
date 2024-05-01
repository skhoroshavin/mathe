import style from './Button.module.css'

import {createSignal, JSXElement} from "solid-js";

interface Props {
    value: number
    onClick: (v: number) => void
}

export default function Button(props: Props): JSXElement {
    const [active, setActive] = createSignal(false)

    const activate = () => setActive(true)
    const deactivate = () => setActive(false)

    return <div class={style.container}>
        <button onClick={() => props.onClick(props.value)}
                onMouseDown={activate} onMouseUp={() => setTimeout(deactivate, 50)}
                onTouchStart={activate} onTouchEnd={deactivate}
                classList={{
                    [style.button]: true,
                    [style.active]: active()
                }}>
            {props.value}
        </button>
    </div>
}