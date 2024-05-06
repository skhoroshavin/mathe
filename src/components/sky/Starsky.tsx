import styles from './Starsky.module.css'
import {CSSProperties, useRef} from "react";
import {Star} from "./Star.tsx";
import {Scene} from "./core/scene.ts";

interface Props {
    color: string
    speed: number
    inHyperspace: boolean
    now: number
}

export default function Starsky(props: Props) {
    const sceneRef = useRef<Scene>()
    if (sceneRef.current == null) {
        sceneRef.current = new Scene()
    }

    const scene = sceneRef.current
    scene.update(0.0001 * props.speed, props.now, props.inHyperspace)

    return <svg width="100%" height="100%" viewBox="-1 -1 2 2"
                className={styles.container} style={{"--star-color": props.color} as CSSProperties}>
        {scene.points().map(
            p => <Star key={p.id} p0={p.p0} r0={0.005} p1={p.p1} r1={0.005} color={props.color}/>
        )}
    </svg>
}
