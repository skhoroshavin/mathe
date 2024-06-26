import {vec2} from "./core/vector.ts";

interface Props {
    color: string

    p0: vec2
    r0: number

    p1: vec2
    r1: number
}

export function Star(props: Props) {
    const path = () => {
        const dn = props.p0.normalized()
        const p0 = props.p0.add(dn.mul(0.5 * props.r0))
        const p1 = props.p1.add(dn.mul(-0.5 * props.r1))

        const sn = new vec2(-dn.y, dn.x)
        const s0 = sn.mul(0.5 * props.r0)
        const s1 = sn.mul(0.5 * props.r1)

        const v0 = p0.sub(s0).toString()
        const v1 = p0.add(s0).toString()
        const v2 = p1.add(s1).toString()
        const v3 = p1.sub(s1).toString()

        return `M ${v0} L ${v1} L ${v2} L ${v3} L ${v0}`
    }
    return <path fill={props.color} d={path()}/>
}
