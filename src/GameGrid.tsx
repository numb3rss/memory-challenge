import React, {useState, useEffect} from "react";
import './GameGrid.scss';
import GameCell from "./GameCell";
import { buildCellData } from './GameService'
import {CellData} from "./CellData";
import {ChallengeCell} from "./ChallengeCell";

interface Props {
    challengeCells: ChallengeCell[]
    isOver: any,
    isWon: any
}

const useGridState = (props: Props, challengeCells: CellData[]) => {
    const [grid, setCellsData] = useState(challengeCells)
    const [secondsLeft, setSecondsLeft] = useState(3)
    const [attempts, setAttempts] = useState(3)
    const [goodResponses, setGoodResponses] = useState(0)

    useEffect(() => {
        if(secondsLeft > 0) {
            const timerId = setTimeout(() => {
                console.log(`I decrease ${secondsLeft}`)
                setSecondsLeft(secondsLeft - 1)
            }, 1000)

            return () => clearTimeout(timerId)
        }

        let newCellsData = grid.map((cellData) => {
            return {
                x: cellData.x,
                y: cellData.y,
                status: 'default'
            }
        })
        setCellsData(newCellsData)

    }, [secondsLeft])

    useEffect(() => {
        if (goodResponses === 6) {
            props.isWon();
            return
        }

        if (attempts === 0) {
            props.isOver()
        }
    }, [attempts, goodResponses])
    
    const setGridState = (x: number, y: number) => {
        if(secondsLeft !== 0) return
        
        let newCellsData = [...grid]
        let newCellData = newCellsData.find(n => n.x === x && n.y === y)
        if(newCellData === undefined) throw new Error("cellData have to be found")
        const status = getStatus(newCellData)
        
        if(status === 'wrong')
            setAttempts(attempts - 1)
        else
            setGoodResponses(goodResponses + 1)

        newCellData.status = status
        setCellsData(newCellsData)
    }

    const getStatus = (cellData: CellData): string => {
        const isPresent: boolean = props.challengeCells.some((r: ChallengeCell) => r.x === cellData.x && r.y === cellData.y)
        return isPresent ? 'success' : 'wrong'
    }
    
    return { grid, setGridState }
}

const GameGrid = (props: Props) => {
    const cellsDataBuild = buildCellData(5, props.challengeCells)
    const { grid, setGridState } = useGridState(props, cellsDataBuild)
    
    const onCellClicked = (x: number, y: number) => {
        setGridState(x, y)
    }

    return (
        <div className="container">
            {grid.map((cell) => 
                <GameCell key={cell.x+''+cell.y} cellData={cell} onCellClicked={onCellClicked} />
            )}
        </div>
    );
}

export default GameGrid;