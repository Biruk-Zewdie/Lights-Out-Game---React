import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      initialBoard.push(row);
    }
  
    return initialBoard;
    //new Array(5).fill().map(row => new Array(5).fill().map(column => Math.random() < 0.5) )
    //return initialBoard;
  }

  

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

      };

      // TODO: Make a (deep) copy of the oldBoard

      // const deepCopy = (arr) => (arr.map(innerArr => [...innerArr]))
      // const boardCopy = deepCopy(oldBoard);

      const boardCopy = oldBoard.map(innerArr => [...innerArr])

      // TODO: in the copy, flip this cell and the cells around it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        boardCopy[y][x] = !boardCopy[y][x];
      }

      if (x - 1 >= 0) {
        boardCopy[y][x - 1] = !boardCopy[y][x - 1]
      }
      if (x + 1 < ncols) {
        boardCopy[y][x + 1] = !boardCopy[y][x + 1]
      }
      if (y - 1 >= 0) {
        boardCopy[y - 1][x] = !boardCopy[y - 1][x]
      }
      if (y + 1 < nrows) {
        boardCopy[y + 1][x] = !boardCopy[y + 1][x]
      }

      // TODO: return the copy
      return boardCopy;
    });
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.every(row => row.every(cell => !cell))
  }
  console.log(hasWon());
  // if the game is won, just show a winning msg & render nothing else

  // TODO
  return (
    <div className="board">
      <h2 className="title">Lights Out</h2>
      {hasWon() ? <div className = "winning-msg">You won!</div> : (
        <table className="board-table">
          <tbody>
            {board.map((row, rowIndex) =>
              <tr className="row" key={rowIndex}>
                {row.map((cell, colIndex) =>
                  <Cell
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    key={`${rowIndex}-${colIndex}`}
                    flipCellsAroundMe={flipCellsAround}
                    isLit={board[rowIndex][colIndex]} />
                )}
              </tr>)}
          </tbody>
        </table>
      )}
    </div >

  )

}
export default Board;
