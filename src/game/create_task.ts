import {Task} from "./core/task.ts";
import {oneOf, someInteger} from "./core/random.ts";

export const createTask = (complexity: number) => {
    const realComplexity = randomizeComplexity(complexity)
    const cfg = oneOf(taskFactoryConfig[realComplexity])
    const a = oneOf(cfg.a)
    const b = oneOf(cfg.b)
    return cfg.typ(a, b)
}

const randomizeComplexity = (complexity: number): number => {
    const c = Math.min(
        Math.max(0, complexity),
        taskFactoryConfig.length - 1
    )
    let possibleComplexity = [c, c, c, c]
    if (c < taskFactoryConfig.length - 1) {
        possibleComplexity.push(c + 1)
    }
    if (c > 0) {
        possibleComplexity.push(c - 1)
        possibleComplexity.push(c - 1)
    }
    return oneOf(possibleComplexity)
}

type TaskType = (a: number, b: number) => Task

const simpleMultiply: TaskType = (a: number, b: number): Task => {
    const c = a * b
    switch (someInteger(2)) {
        case 0:
            return new Task(`${a} * ${b} = ?`, c.toString())
        default:
            return new Task(`${b} * ${a} = ?`, c.toString())
    }
}

// const simpleDivide: TaskType = (a: number, b: number): Task => {
//     const c = a * b
//     switch (someInteger(2)) {
//         case 0:
//             return new Task(`${c} : ${a} = ?`, b.toString())
//         default:
//             return new Task(`${c} : ${b} = ?`, a.toString())
//     }
// }

const equationMultiply: TaskType = (a: number, b: number): Task => {
    const c = a * b
    switch (someInteger(4)) {
        case 0:
            return new Task(`${a} * ? = ${c}`, b.toString())
        case 1:
            return new Task(`${b} * ? = ${c}`, a.toString())
        case 2:
            return new Task(`? * ${b} = ${c}`, a.toString())
        default:
            return new Task(`? * ${a} = ${c}`, b.toString())
    }
}

// const equationDivide: TaskType = (a: number, b: number): Task => {
//     const c = a * b
//     switch (someInteger(4)) {
//         case 0:
//             return new Task(`${c} : ? = ${a}`, b.toString())
//         case 1:
//             return new Task(`${c} : ? = ${b}`, a.toString())
//         case 2:
//             return new Task(`? : ${b} = ${a}`, c.toString())
//         default:
//             return new Task(`? : ${a} = ${b}`, c.toString())
//     }
// }

interface FactoryConfig {
    typ: TaskType
    a: number[]
    b: number[]
}

const taskFactoryConfig: FactoryConfig[][] = [
    [   // 0
        {typ: simpleMultiply, a: [2], b: [1, 2, 3, 4]}
    ],
    [   // 1
        {typ: simpleMultiply, a: [2], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [2], b: [1, 2, 3, 4]},
    ],
    [   // 2
        {typ: simpleMultiply, a: [4], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [2], b: [6, 7, 8, 9]},
    ],
    [   // 3
        {typ: simpleMultiply, a: [4], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [4], b: [1, 2, 3, 4]},
    ],
    [   // 4
        {typ: simpleMultiply, a: [8], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [4], b: [6, 7, 8, 9]},
    ],
    [   // 5
        {typ: simpleMultiply, a: [8], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [8], b: [1, 2, 3, 4]},
    ],
    [   // 6
        {typ: simpleMultiply, a: [3], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [8], b: [6, 7, 8, 9]},
    ],
    [   // 7
        {typ: simpleMultiply, a: [3], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [3], b: [1, 2, 3, 4]},
    ],
    [   // 8
        {typ: simpleMultiply, a: [6], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [3], b: [6, 7, 8, 9]},
    ],
    [   // 9
        {typ: simpleMultiply, a: [6], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [6], b: [1, 2, 3, 4]},
    ],
    [   // 10
        {typ: simpleMultiply, a: [9], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [6], b: [6, 7, 8, 9]},
    ],
    [   // 11
        {typ: simpleMultiply, a: [9], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [9], b: [1, 2, 3, 4]},
    ],
    [   // 12
        {typ: simpleMultiply, a: [7], b: [1, 2, 3, 4]},
        {typ: equationMultiply, a: [9], b: [6, 7, 8, 9]},
    ],
    [   // 13
        {typ: simpleMultiply, a: [7], b: [6, 7, 8, 9]},
        {typ: equationMultiply, a: [7], b: [1, 2, 3, 4]},
    ],
    [   // 14
        {typ: equationMultiply, a: [7], b: [6, 7, 8, 9]},
    ],
]


// const taskFactoryConfig: FactoryConfig[][] = [
//     [   // 0
//         {typ: simpleMultiply, a: [2], b: [1, 2, 3, 4]}
//     ],
//     [   // 1
//         {typ: simpleDivide, a: [2], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [2], b: [6, 7, 8, 9]},
//     ],
//     [   // 2
//         {typ: equationMultiply, a: [2], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [2], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [4], b: [1, 2, 3, 4]}
//     ],
//     [   // 3
//         {typ: equationDivide, a: [2], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [2], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [4], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [4], b: [6, 7, 8, 9]}
//     ],
//     [   // 4
//         {typ: equationDivide, a: [2], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [4], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [4], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [8], b: [1, 2, 3, 4]}
//     ],
//     [   // 5
//         {typ: equationDivide, a: [4], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [4], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [8], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [8], b: [6, 7, 8, 9]}
//     ],
//     [   // 6
//         {typ: equationDivide, a: [4], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [8], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [8], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [3], b: [1, 2, 3, 4]}
//     ],
//     [   // 7
//         {typ: equationDivide, a: [8], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [8], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [3], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [3], b: [6, 7, 8, 9]}
//     ],
//     [   // 8
//         {typ: equationDivide, a: [8], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [3], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [3], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [6], b: [1, 2, 3, 4]}
//     ],
//     [   // 9
//         {typ: equationDivide, a: [3], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [3], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [6], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [6], b: [6, 7, 8, 9]}
//     ],
//     [   // 10
//         {typ: equationDivide, a: [3], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [6], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [6], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [9], b: [1, 2, 3, 4]}
//     ],
//     [   // 11
//         {typ: equationDivide, a: [6], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [6], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [9], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [9], b: [6, 7, 8, 9]}
//     ],
//     [   // 12
//         {typ: equationDivide, a: [6], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [9], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [9], b: [6, 7, 8, 9]},
//         {typ: simpleMultiply, a: [7], b: [1, 2, 3, 4]}
//     ],
//     [   // 13
//         {typ: equationDivide, a: [9], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [9], b: [6, 7, 8, 9]},
//         {typ: simpleDivide, a: [7], b: [1, 2, 3, 4]},
//         {typ: simpleMultiply, a: [7], b: [6, 7, 8, 9]}
//     ],
//     [   // 14
//         {typ: equationDivide, a: [9], b: [6, 7, 8, 9]},
//         {typ: equationMultiply, a: [7], b: [1, 2, 3, 4]},
//         {typ: simpleDivide, a: [7], b: [6, 7, 8, 9]}
//     ],
//     [   // 15
//         {typ: equationDivide, a: [7], b: [1, 2, 3, 4]},
//         {typ: equationMultiply, a: [7], b: [6, 7, 8, 9]},
//     ],
//     [   // 16
//         {typ: equationDivide, a: [7], b: [6, 7, 8, 9]},
//     ],
// ]
