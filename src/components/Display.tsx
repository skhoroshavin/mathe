import styles from './Display.module.css'

interface Props {
    value: string
    score: number
    hasError: boolean
}

export default function Display(props: Props) {
    return <div className={styles.container}>
        <div className={`${styles.display} ${props.hasError ? styles.error : ""}`}>
            {props.value}
        </div>
        <div className={styles.scoreContainer}>
            <div className={styles.score} style={{"height": `${props.score}%`}}/>
        </div>
    </div>
}
