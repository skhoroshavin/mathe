import styles from './Display.module.css'
import Starsky from "./sky/Starsky.tsx";
import {CSSProperties} from "react";
import {clsx} from 'clsx';

interface Props {
    task: string,
    score: number,
    level: number,
    hasError: boolean,
    inHyperspace: boolean,
    now: number
}

export default function Display(props: Props) {
    const color = getColor(props.level)

    return <div className={styles.container} style={{"--hud": color} as CSSProperties}>
        <Starsky color={color} speed={props.score} inHyperspace={props.inHyperspace} now={props.now}/>
        <div className={clsx(styles.display, props.hasError && styles.error)}>
            {props.task}
        </div>
        <div className={styles.gaugeContainer}>
            <div className={styles.gauge} style={{"height": `${Math.min(100, props.score)}%`}}/>
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
