import style from './Button.module.css'

import type {JSXElement} from "solid-js";

interface Props {
    value: number
    onClick: (v: number) => void
}

export default function Button(props: Props): JSXElement {
    return <div class={style.container}>
        <button class={style.button} onClick={() => props.onClick(props.value)}>
            {props.value}
        </button>
    </div>
}