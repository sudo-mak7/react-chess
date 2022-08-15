import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
  board: Board
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
  whiteWins: boolean
  blackWins: boolean
}

const BoardComponent: FC<BoardProps> = ({board,
                                          setBoard,
                                          currentPlayer,
                                          swapPlayer,
                                          whiteWins,
                                          blackWins
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell)
      swapPlayer()
      setSelectedCell(null)
    } else if (cell.figure?.color === currentPlayer?.color) {
      setSelectedCell(cell)
    }

    if (whiteWins || blackWins) {
      return
    }
  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  const highlightCells = () => {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  return (
    <div>
      <div className="board">
        {board.cells.map((row, index) =>
          <React.Fragment key={index}>
            {row.map(cell =>
              <CellComponent
                click={click}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                whiteWins={whiteWins}
                blackWins={blackWins}
                key={cell.id}
              />
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;