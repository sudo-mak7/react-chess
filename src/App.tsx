import React, {useEffect, useRef, useState} from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import LostFigures from "./components/LostFigures";

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePLayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPLayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
  }, [])

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
    setTimeWinner('display-none')
  }
  
  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  const [whiteTime, setWhiteTime] = useState(300)
  const [blackTime, setBlackTime] = useState(300)

  const [whiteWins, setWhiteWins] = useState(false)
  const [blackWins, setBlackWins] = useState(false)

  const [timeWinner, setTimeWinner] = useState('display-none')

  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  })

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current)
    }

    const callback = () => currentPlayer?.color === Colors.WHITE
      ? decrementWhiteTimer(whiteTime)
      : decrementBlackTimer(blackTime)

    timer.current = setInterval(callback , 1000)
  }

  const decrementWhiteTimer = (whiteTime: number) => {
    setWhiteTime(whiteTime === 0 ? 0 : whiteTime - 1)
    if (whiteTime === 0) {
      setTimeWinner('time-winner')
      setBlackWins(true)
    }
  }

  const decrementBlackTimer = (blackTime: number) => {
    setBlackTime(blackTime === 0 ? 0 : blackTime - 1)
    if (blackTime === 0) {
      setTimeWinner('time-winner')
      setWhiteWins(true)
    }
  }

  const handleRestart = () => {
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  return (
    <div className="app">
      <div className="game">
        <div className="sidebar outline">
          <h2>{currentPlayer?.color === 'white' ? 'ХОД БЕЛЫХ' : '>>>'}</h2>
          <LostFigures
            title='Белые фигуры'
            figures={board.lostWhiteFigures}
          />
          <h2>Таймер — {whiteTime}</h2>
        </div>

        <div>
          <div className={timeWinner}>
            <h1>ВРЕМЯ ВЫШЛО! <br/>
            ПОБЕДА {whiteWins ? 'БЕЛЫХ' : ''} {blackWins ? 'ЧЕРНЫХ' : ''}</h1>
          </div>
          <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
            whiteWins={whiteWins}
            blackWins={blackWins}
          />
            <button className="button" onClick={handleRestart}>НОВАЯ ИГРА</button>
        </div>

        <div className="sidebar outline">
          <h2>{currentPlayer?.color === 'white' ? '<<<' : 'ХОД ЧЕРНЫХ'}</h2>
            <LostFigures
              title='Черные фигуры'
              figures={board.lostBlackFigures}
            />
          <h2>Таймер — {blackTime}</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
