import React, {useState} from "react";
import './GameGrid.scss';
import GameCell from "./GameCell";
import {buildCellData, buildRandomChallengeCells} from './GameService'

const GameGrid = () => {
    const randomChallengeCells = buildRandomChallengeCells(6)
    const cellsDataBuild = buildCellData(5, randomChallengeCells);
    const [cellsData, setCellsData] = useState(cellsDataBuild);
    
    const onCellClicked = (x: number, y: number) => {
        let newCellsData = [...cellsData]
        let newCellData = newCellsData.find(n => n.x === x && n.y === y)
        if(newCellData === undefined) throw new Error("cellData have to be found")
        newCellData.status = "success"
        setCellsData(newCellsData)
    }

    console.log(cellsData)

    return (
        <div className="container">
            {cellsData.map((cell) => 
                {
                    console.log('GameGrid')
                    console.log(cell)
                    console.log('----------')
                    return <GameCell key={cell.x+''+cell.y} cellData={cell} onCellClicked={onCellClicked} />
                }
            )}
        </div>
    );
}

export default GameGrid;