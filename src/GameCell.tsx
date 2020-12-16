import React from "react";
import './GameCell.scss'
import {CellData} from "./CellData";

type Props = {
    cellData: CellData,
    onCellClicked: any
}

const colors: any = {
    default: 'lightgrey',
    wrong: 'red',
    challenge: 'dodgerblue',
    success: 'greenyellow'
}

const GameCell = (props: Props) => {
    console.log(`GameCell`)
    console.log(props.cellData)
    
    const style = {
        backgroundColor: colors[props.cellData.status]
    }
    
    /*if(props.x === 1 && props.y === 4 ||
        props.x === 2 && props.y === 3)
        className += " challenge"*/
    
    return (
        <div className="cell" style={style} onClick={(event) => {
            props.onCellClicked(props.cellData.x, props.cellData.y)
            event.preventDefault()
        }}>
            
        </div>
    )
}



export default GameCell;