import style from './Button.module.css'

interface Props {
    value: number
    onClick: (v:number) => void
}

export default function Button(props: Props) {
    return <div className={style.container}>
        <button className={style.button} onClick={() => props.onClick(props.value)}>
            {props.value}
        </button>
    </div>
}