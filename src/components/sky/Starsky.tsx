import styles from './Starsky.module.css'
import {CSSProperties, useRef} from "react";
import {Star} from "./Star.tsx";
import {Scene} from "./scene.ts";

interface Props {
    color: string
    speed: number
    now: number
}

export default function Starsky(props: Props) {
    const sceneRef = useRef<Scene>()
    if (sceneRef.current == null) {
        sceneRef.current = new Scene()
    }

    const scene = sceneRef.current
    scene.update(props.speed, props.now)

    return <svg width="100%" height="100%" viewBox="0 0 100 100"
                className={styles.container} style={{"--star-color": props.color} as CSSProperties}>
        {scene.points.map((p, i) =>
            <Star key={i} color={props.color} p0={p.p} r0={0.5} p1={p.pn} r1={0.5}/>)}
    </svg>
}
