import conwayArray from "./conway.js";
class GameOfLife {
  // let gameBoard = [][];

  constructor(boardSize) {
    this.boardSize = boardSize;
    this.gameBoard = new Array(boardSize * boardSize);
    this.conway = conwayArray;
  }
  initializeGame(boardSize, randomize) {
    this.boardSize = boardSize;
    this.gameBoard = new Array(boardSize * boardSize);

    let index = 0;
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        //make 10% of cells randomly alive
        let randomLife = false;
        if (randomize) {
          randomLife = Math.random() * 100 > 90 ? true : false;
        } else {
          //first board initialization with welcome message
          if (this.conway.includes(index)) {
            randomLife = true;
          }
        }
        let newCell = { row: i, col: j, alive: randomLife, index: index };

        newCell.neighbors = this.calculateNeighbors(newCell);

        this.gameBoard[index] = newCell;
        index++;
      }
    }

    return this.gameBoard;
  }

  calculateNeighbors(cell) {
    let neighbors = [];
    let neighborIDs = [];

    let nNW, nN, nNE, nE, nSE, nS, nSW, nW;

    //assign neighbors ignoring if it falls outside the bounds of the game board
    nNW = [cell.row - 1, cell.col - 1];
    nN = [cell.row - 1, cell.col];
    nNE = [cell.row - 1, cell.col + 1];
    nE = [cell.row, cell.col + 1];
    nSE = [cell.row + 1, cell.col + 1];
    nS = [cell.row + 1, cell.col];
    nSW = [cell.row + 1, cell.col - 1];
    nW = [cell.row, cell.col - 1];

    //add all neighbors to array
    neighbors.push(nNW, nN, nNE, nE, nSE, nS, nSW, nW);

    if (cell.row > 0 && cell.row < this.boardSize - 1 && cell.col > 0 && cell.col < this.boardSize - 1) {
      // get the index of each neighbor and add it to id array
      neighborIDs = neighbors.map(loc => {
        return this.boardSize * loc[0] + loc[1];
      });

      return neighborIDs;
    }
    // check if any neighbors are outside bounds and wrap
    neighbors.map(loc => {
      //first check if any are past the right or bottom edge/ if so move to top or left
      loc[0] = loc[0] === this.boardSize ? 0 : loc[0];
      loc[1] = loc[1] === this.boardSize ? 0 : loc[1];
      //then check if any are past the top or left edge/ if so move to bottom or right

      loc[0] = loc[0] === -1 ? this.boardSize - 1 : loc[0];
      loc[1] = loc[1] === -1 ? this.boardSize - 1 : loc[1];
      return 0;
    });

    neighborIDs = neighbors.map(loc => {
      // get the index of each neighbor and add it to id array

      return this.boardSize * loc[0] + loc[1];
    });

    return neighborIDs;
  }

  createNewGeneration(oldGeneration) {
    //create copy of oldGeneration to update
    let newGeneration = oldGeneration.slice();

    newGeneration = oldGeneration.map(cell => {
      let livingNeighbors = 0;
      //count the living neighbors for each cell
      cell.neighbors.map(neighbor => {
        livingNeighbors += oldGeneration[neighbor].alive ? 1 : 0;
        return 0;
      });

      //check living neighbors against Game Of Life Rules
      //this is most common state, so check for it first and return it right away
      if (!cell.alive && livingNeighbors !== 3) {
        return cell;
      } else if (cell.alive && (livingNeighbors === 2 || livingNeighbors === 3)) {
        return cell;
      } else if (!cell.alive && livingNeighbors === 3) {
        let newCell = { ...cell };
        newCell.alive = true;
        return newCell;
      } else if (cell.alive && (livingNeighbors < 2 || livingNeighbors > 3)) {
        let newCell = { ...cell };
        newCell.alive = false;
        return newCell;
      } else {
        return cell;
      }
    });

    return newGeneration;
  }

  clearBoard(board) {
    let newBoard = new Array(board.length);
    newBoard = board.map(cell => {
      cell.alive = false;
      return cell;
    });

    return newBoard;
  }
}
export default GameOfLife;

// NO WRAP
// loc[0] = loc[0] === this.boardSize ? -10 : loc[0];
// loc[1] = loc[1] === this.boardSize ? -10 : loc[1];
// //then check if any are past the top or left edge/ if so move to bottom or right

// loc[0] = loc[0] === -1 ? -1 : loc[0];
// loc[1] = loc[1] === -1 ? -1 : loc[1];
