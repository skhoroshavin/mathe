import type {Answer} from "./answer";

import {makeRightAnswer, makeWrongAnswer} from "./answer"

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
    answers: Answer[]
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
            answers: addAnswer(state.answers, now, makeWrongAnswer(now)),
            error: now
        }
    }

    return {
        ...state,
        value: newValue(state.value),
        answers: addAnswer(state.answers, now, makeRightAnswer(now)),
    }
}

function totalScore(answers: Answer[], now: number): number {
    return Math.max(0, answers
        .map(answer => answer.score(now))
        .reduce((prev, next) => prev + next, 0))
}

function addAnswer(answers: Answer[], now: number, answer: Answer): Answer[] {
    return [
        ...answers.filter(v => v.score(now) != 0),
        answer,
    ]
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
