import React, {useState} from 'react';
import './App.scss'
import GameGrid from "./GameGrid";
import {buildRandomChallengeCells} from "./GameService";

const App = () => {
    const [isWon, setIsWon] = useState(false)
    const [isOver, setIsOver] = useState(false)
    const [key, setKey] = useState(0)
    const randomChallengeCells = buildRandomChallengeCells(6)
    
    const onClick = () => {
        setKey(key + 1)
        setIsOver(false)
        setIsWon(false)
    }
    
    return (
      <div className="app">
          <p> 
              In this game, blue indicates a challenge cell, green indicates <br/>
              a recall, and red indicates a wrong recall. Before taking the screenshot <br/>
              above, I correctly recalled 3 cells and the game was over after <br/>
              3 wrong attemps. There is a "Play Again" button for this game as well.
          </p>
        <GameGrid key={key} isOver={() => setIsOver(true)} isWon={() => setIsWon(true)} challengeCells={randomChallengeCells}/>
        { isOver ? (
            <div className="game-over">
                <p>Game Over</p>
                <button onClick={onClick}>Play again</button>
            </div>
        ) : <></> }
          { isWon ? (
              <div className="game-won">
                  <p>Game is won</p>
              </div>
          ) : <></> }
      </div>
    );
}

export default App;
