import {JSXElement} from "solid-js";
import {vec2} from "./vector.ts";

interface Props {
    color: string

    p0: vec2
    r0: number

    p1: vec2
    r1: number
}

export function Star(props: Props): JSXElement {
    const path = () => {
        const dn = props.p1.sub(props.p0).normalized()
        const sn = new vec2(dn.y, dn.x)
        const s0 = sn.mul(props.r0 / 2)
        const s1 = sn.mul(props.r1 / 2)

        const v0 = props.p0.sub(s0).toString()
        const v1 = props.p0.add(s0).toString()
        const v2 = props.p1.add(s1).toString()
        const v3 = props.p1.sub(s1).toString()

        return `M ${v0} L ${v1} L ${v2} L ${v3} L ${v0}`
    }
    return <path fill={props.color} d={path()}/>
}
