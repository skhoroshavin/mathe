
export interface GameView {
    readonly value: number
    readonly score: number
    readonly error: boolean
}

export function makeGameView(state: GameState, now: number): GameView {
    console.log(state)
    return {
        value: state.value,
        score: totalScore(state.answers, now),
        error: now - state.error < 500,
    }
}

export interface GameState {
    value: number
    answers: number[]
    error: number
}

export function makeGameState(): GameState {
    return {
        value: randomValue(),
        answers: [],
        error: 0,
    }
}

export function answer(state: GameState, value: number, now: number): GameState {
    if (state.value + value != 10) {
        return {
            ...state,
            error: now
        }
    }

    return {
        ...state,
        value: newValue(state.value),
        answers: addAnswer(state.answers, now),
    }
}

function totalScore(answers: number[], now: number): number {
    return answers
        .map(answer => score(answer, now))
        .reduce((prev, next) => prev + next, 0)
}

function addAnswer(answers: number[], now: number): number[] {
    return [
        ...answers.filter(v => score(v, now) > 0),
        now
    ]
}

function score(answer: number, now: number): number {
    const elapsedSeconds = (now - answer) / 1000
    return Math.max(0, 10 - 0.5 * elapsedSeconds)
}

function newValue(prev: number): number {
    let next
    do { next = randomValue() }
    while (next == prev)
    return next
}

const randomValue = () => {
    return 1 + Math.floor(Math.random() * 9)
}
