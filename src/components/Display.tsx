import styles from './Display.module.css'

import {JSXElement} from "solid-js";
import Starsky from "./sky/Starsky.tsx";

interface Props {
    task: string,
    score: number,
    level: number,
    hasError: boolean,
    now: number
}

export default function Display(props: Props): JSXElement {
    const color = () => getColor(props.level)

    return <div class={styles.container} style={{"--hud": color()}}>
        <Starsky color={color()} speed={props.score} now={props.now}/>
        <div classList={{
            [styles.display]: true,
            [styles.error]: props.hasError
        }}>
            {props.task}
        </div>
        <div class={`${styles.gaugeContainer} ${styles.gaugeContainerRight}`}>
            <div class={styles.gauge} style={`height: ${props.score}%`}/>
        </div>
    </div>
}

function getColor(level: number): string {
    const colors = [
        "hsl(195, 100%, 50%)",
        "hsl(172, 100%, 50%)",
        "hsl(150, 100%, 50%)",
        "hsl(127, 100%, 55%)",
        "hsl(105, 100%, 60%)",
        "hsl(82, 100%, 50%)",
        "hsl(60, 100%, 40%)",
        "hsl(30, 100%, 60%)",
        "hsl(355, 100%, 50%)",
    ]

    const clampedLevel = Math.max(0, Math.min(99, level))
    const idx = Math.floor(clampedLevel * colors.length / 100)
    return colors[idx]
}
