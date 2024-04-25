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
        <div class={`${styles.gaugeContainer} ${styles.gaugeContainerLeft}`}>
            <div class={styles.gauge} style={`height: ${props.level}%`}/>
        </div>
        <div class={`${styles.gaugeContainer} ${styles.gaugeContainerRight}`}>
            <div class={styles.gauge} style={`height: ${props.score}%`}/>
        </div>
    </div>
}
