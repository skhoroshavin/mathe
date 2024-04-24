import styles from './Display.module.css'

import type {JSXElement} from "solid-js";

interface Props {
    task: string
    score: number
    level: number
    hasError: boolean
}

export default function Display(props: Props): JSXElement {
    return <div class={styles.container}>
        <div classList={{
            [styles.display]: true,
            [styles.error]: props.hasError
        }}>
            {props.task}
        </div>
        <div class={styles.levelContainer}>
            <div class={styles.level} style={`height: ${props.level}%`}/>
        </div>
        <div class={styles.scoreContainer}>
            <div class={styles.score} style={`height: ${props.score}%`}/>
        </div>
    </div>
}
