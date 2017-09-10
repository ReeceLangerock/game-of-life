import React from "react";
import styled, { injectGlobal } from "styled-components";
import Cell from "./Cell";
import gameOfLife from "../gameOfLife.js";
import ButtonContainer from "./ButtonContainer";

const StyledHeader = styled.div``;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  // width: ${props => 700 / props.size}px;
  width: 500px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  margin: 0 auto;
`;

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.renderBoard = this.renderBoard.bind(this);
    this.handOfGod = this.handOfGod.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resize = this.resize.bind(this);
    this.clear = this.clear.bind(this);
    this.startGameOfLife = this.startGameOfLife.bind(this);
    let boardSize = 50;
    console.log("const");
    const game = new gameOfLife(boardSize);

    this.state = {
      boardSize,
      gameBoard: new Array(boardSize),
      gameActive: false,
      game,
      generations: 0
    };
  }

  componentWillMount() {
    this.startGameOfLife();
  }

  timer() {
    let timer = setInterval(() => {
      // const game = new gameOfLife(this.state.boardSize);

      const updatedBoard = this.state.game.createNewGeneration(this.state.gameBoard);
      let generation = this.state.generations + 1;

      this.setState({
        gameBoard: updatedBoard,
        generations: generation
      });
    }, 50);
    this.setState({ timer });
  }

  startGameOfLife() {
    // console.log("gol", this.state.boardSize);
    // const game = new gameOfLife(this.state.boardSize);
    //  var t0 = performance.now();
    let board = this.state.game.initializeGame();
    //     var t1 = performance.now();
    // console.log("Call to initializeGame took " + (t1 - t0) + " milliseconds.");
    this.setState(
      {
        gameBoard: board
      }
      // console.log(this.state)
    );
  }

  handOfGod(index) {
    var t0 = performance.now();
    const board = this.state.gameBoard;
    board[index].alive = !board[index].alive;
    console.log(board[index]);
    this.setState(
      {
        gameBoard: board
      },
      () => {
        var t1 = performance.now();
        console.log("Call to initializeGame took " + (t1 - t0) + " milliseconds.");
      }
    );
  }

  toggleTimer(e) {
    console.log(e);

    if (!this.state.gameActive && e === "run") {
      this.timer();
      this.setState({
        gameActive: true
      });
    } else if (this.state.gameActive && e === "pause") {
      clearInterval(this.state.timer);
      this.setState({
        gameActive: false
      });
    }
  }

  resize() {
    this.setState(
      {
        boardSize: 40
      },
      () => {
        this.startGameOfLife();
      }
    );
  }

  clear() {
    let clearedBoard = this.state.game.clearBoard(this.state.gameBoard);
    this.setState({
      board: clearedBoard
    });
  }

  renderBoard() {
    return this.state.gameBoard.map(cell => {
      return <Cell ref={ref => (this.cellIndex = ref)} key={cell.index} status={cell.alive} size={this.state.boardSize} onClick={this.handOfGod.bind(this, cell.index)} />;
    });
  }

  render() {
    return (
      <div>
        {" "}
        <ButtonContainer onRun={this.toggleTimer.bind(this, "run")} onPause={this.toggleTimer.bind(this, "pause")} clear={this.clear} />
        <Container size={this.state.boardSize}>{this.renderBoard()}</Container>
        {this.state.generations}
      </div>
    );
  }
}
export default Board;
