import { ChallengeCell } from "./ChallengeCell";
import { CellData } from "./CellData";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const buildRandomChallengeCells = (count: number) => {
    let randomChallengeCells: ChallengeCell[] = []
    let i = 0
    while (i < count) {
        const x = getRandomInt(0, 4)
        const y = getRandomInt(0, 4)
        if(!randomChallengeCells.some(rc => rc.x === x && rc.y === y)){
            randomChallengeCells.push({ x, y})
            i++
        }
    }
    return randomChallengeCells
}

export const buildCellData = (length: number, challengeCells: ChallengeCell[]): CellData[] => {
    let cellData: CellData[] = []
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            const isChallenged = challengeCells.some((ch: ChallengeCell) => ch.x === i && ch.y === j)
            const status = isChallenged ? 'challenge' : 'default'
            cellData.push({
                status,
                x: i,
                y: j
            })
        }
    }
    return cellData
}