class GameOfLife {
  // let gameBoard = [][];

  constructor(boardSize) {
    this.boardSize = boardSize;

    this.gameBoard = new Array(boardSize * boardSize);

    this.cell = {
      x: undefined,
      y: undefined
    };
  }
  initializeGame() {
    let index = 0;
    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        let randomLife = Math.random() * 100 > 90 ? true : false;
        let newCell = { row: i, col: j, alive: randomLife, index: index };

        newCell.neighbors = this.calculateNeighbors(newCell);

        this.gameBoard[index] = newCell;
        index++;
      }
    }

    return this.gameBoard;
  }

  calculateNeighbors(cell) {
    // debugger;
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
    });

    neighborIDs = neighbors.map(loc => {
      return this.boardSize * loc[0] + loc[1];
    });

    return neighborIDs;
  }

  createNewGeneration(oldGeneration) {
    let newGeneration = oldGeneration.slice();
    newGeneration = oldGeneration.map(cell => {
      let livingNeighbors = 0;
      cell.neighbors.map(neighbor => {
        livingNeighbors += oldGeneration[neighbor].alive ? 1 : 0;
      });
      
      if (cell.alive && (livingNeighbors === 2 || livingNeighbors === 3)) {
        return cell;
      } else if (!cell.alive && livingNeighbors === 3) {
        let newCell = {...cell}
        newCell.alive = true
        return newCell;
      } else if (cell.alive && (livingNeighbors < 2 || livingNeighbors > 3)) {
        let newCell = {...cell}
        newCell.alive = false
        return newCell;;
      } else {
        return cell;
      }
    });

    return newGeneration;
  }

  clearBoard(board){
    return board.map(cell => {
      cell.alive = false
    });
  }
}
export default GameOfLife;


// NO WRAP
// loc[0] = loc[0] === this.boardSize ? -10 : loc[0];
// loc[1] = loc[1] === this.boardSize ? -10 : loc[1];
// //then check if any are past the top or left edge/ if so move to bottom or right

// loc[0] = loc[0] === -1 ? -1 : loc[0];
// loc[1] = loc[1] === -1 ? -1 : loc[1];