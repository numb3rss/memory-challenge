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
    const style = {
        backgroundColor: colors[props.cellData.status]
    }
    
    return (
        <div className="cell" style={style} onClick={(event) => {
            props.onCellClicked(props.cellData.x, props.cellData.y)
            event.preventDefault()
        }} />
    )
}

export default GameCell;