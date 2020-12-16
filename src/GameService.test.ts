import {buildCellData, buildRandomChallengeCells} from "./GameService";
import {ChallengeCell} from "./ChallengeCell";

describe('Game Service test', () => {
    it('should return 6 random challenge cells', () => {
        //Arrange
        const number = 6;
        
        //Act
        const randomChallengeCells = buildRandomChallengeCells(number)
        
        //Assert
        expect(randomChallengeCells.length).toEqual(number)
        randomChallengeCells.forEach((challengeCell: ChallengeCell) => {
            expect(challengeCell.x).toBeGreaterThanOrEqual(0)
            expect(challengeCell.x).toBeLessThanOrEqual(4)
            expect(Number.isInteger(challengeCell.x)).toBeTruthy()
            expect(challengeCell.y).toBeGreaterThanOrEqual(0)
            expect(challengeCell.y).toBeLessThanOrEqual(4)
            expect(Number.isInteger(challengeCell.y)).toBeTruthy()
        })
    })
    
    it('should build cell data with random challenge cells', () => {
        //Arrange
        const number = 6;

        //Act
        const randomChallengeCells = buildRandomChallengeCells(number)
        const cellsData = buildCellData(5, randomChallengeCells)
        
        //Assert
        expect(cellsData.length).toEqual(25)
        const plainCellsData = cellsData.filter(r => r.status === 'challenge');
        expect(plainCellsData.length).toEqual(number)
        randomChallengeCells.forEach((challengeCell: ChallengeCell) => {
            const actualCellData = plainCellsData.find(pl => pl.x === challengeCell.x && pl.y == challengeCell.y)
            expect(actualCellData).toBeDefined()
        })
    })
})