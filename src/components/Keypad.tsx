import style from './Keypad.module.css'
import Button from "./Button.tsx";

import type {JSXElement} from "solid-js";

interface Props {
    onClick: (v:number) => void
}

export default function Keypad(props: Props): JSXElement {
    return <div class={style.container}>
        <div class={style.row}>
            <Button onClick={props.onClick} value={1}/>
            <Button onClick={props.onClick} value={2}/>
            <Button onClick={props.onClick} value={3}/>
        </div>
        <div class={style.row}>
            <Button onClick={props.onClick} value={4}/>
            <Button onClick={props.onClick} value={5}/>
            <Button onClick={props.onClick} value={6}/>
        </div>
        <div class={style.row}>
            <Button onClick={props.onClick} value={7}/>
            <Button onClick={props.onClick} value={8}/>
            <Button onClick={props.onClick} value={9}/>
        </div>
    </div>
}