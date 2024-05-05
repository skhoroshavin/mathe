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
    scene.update(0.0001 * props.speed, props.now)

    return <svg width="100%" height="100%" viewBox="-1 -1 2 2"
                className={styles.container} style={{"--star-color": props.color} as CSSProperties}>
        {scene.points().map(p => <Star key={p.id} p0={p.p0} r0={0.01} p1={p.p1} r1={0.01} color={props.color}/>
        )}
    </svg>
}
