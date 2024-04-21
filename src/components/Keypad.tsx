import style from './Keypad.module.css'
import Button from "./Button";

interface Props {
    onClick: (v:number) => void
}

export default function Keypad(props: Props) {
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
}