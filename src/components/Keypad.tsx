import style from './Keypad.module.css'
import Button from "./Button.tsx";
import {memo} from "react";

interface Props {
    onClick: (v: number) => void
}

const Keypad = memo((props: Props) => {
    return <div className={style.container}>
        <div className={style.row}>
            <Button onClick={props.onClick} value={1}/>
            <Button onClick={props.onClick} value={2}/>
            <Button onClick={props.onClick} value={3}/>
        </div>
        <div className={style.row}>
            <Button onClick={props.onClick} value={4}/>
            <Button onClick={props.onClick} value={5}/>
            <Button onClick={props.onClick} value={6}/>
        </div>
        <div className={style.row}>
            <Button onClick={props.onClick} value={7}/>
            <Button onClick={props.onClick} value={8}/>
            <Button onClick={props.onClick} value={9}/>
        </div>
    </div>
})

export default Keypad