import React from "react";
import styled from "styled-components";
import Cell from "./Cell";
import gameOfLife from "../gameOfLife.js";
import Button from "./Button";

export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.renderBoard = this.renderBoard.bind(this);
    this.handOfGod = this.handOfGod.bind(this);
    this.toggleSimulation = this.toggleSimulation.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSpeedChange = this.handleSpeedChange.bind(this);
    this.shuffle = this.shuffle.bind(this);

    this.clear = this.clear.bind(this);
    this.startGameOfLife = this.startGameOfLife.bind(this);

    let boardSize = 60;
    const game = new gameOfLife(boardSize);

    this.state = {
      boardSize,
      gameBoard: new Array(boardSize),
      gameActive: false,
      game,
      generations: 0,
      simulationSpeed: 500
    };
  }

  componentWillMount() {
    this.startGameOfLife(false);
  }

  spawnNextGeneration() {
    let timer = setInterval(() => {
      const updatedBoard = this.state.game.createNewGeneration(this.state.gameBoard);
      let generation = this.state.generations + 1;

      this.setState({
        gameBoard: updatedBoard,
        generations: generation
      });
    }, this.state.simulationSpeed);
    this.setState({ timer });
  }

  startGameOfLife(randomize) {
    let board = this.state.game.initializeGame(this.state.boardSize, randomize);

    this.setState({
      gameBoard: board,
      generations: 0
    });
  }

  //give or take life from the clicked on cell
  handOfGod(index) {
    console.log(index)
    const board = this.state.gameBoard;
    board[index].alive = !board[index].alive;
    this.setState({
      gameBoard: board
    });
  }

  //reset the board with random initial cells
  shuffle() {
    this.toggleSimulation("pause");
    this.startGameOfLife(true);
  }

  //toggle the game simulation between running and paused
  toggleSimulation(e) {
    if (!this.state.gameActive && e === "run") {
      this.spawnNextGeneration();
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

  // handle resizing the gameboard size
  handleResize(newBoardSize) {
    this.toggleSimulation("pause");

    this.setState(
      {
        boardSize: newBoardSize,
        generations: 0
      },
      () => {
        this.startGameOfLife(true);
      }
    );
  }

  // handle resizing the simulation speed
  handleSpeedChange(newSpeed) {
    this.toggleSimulation("pause");
    this.setState(
      {
        simulationSpeed: newSpeed
      },
      () => {
        this.toggleSimulation("run");
      }
    );
  }

  clear() {
    let clearedBoard = this.state.game.clearBoard(this.state.gameBoard);
    this.setState(
      {
        board: clearedBoard,
        generations: 0
      },
      () => {
        this.toggleSimulation("pause");
      }
    );
  }

  renderBoard() {
    return this.state.gameBoard.map(cell => {
      return <Cell ref={ref => (this.cellIndex = ref)} key={cell.index} status={cell.alive} size={this.state.boardSize} onClick={this.handOfGod.bind(this, cell.index)} />;
    });
  }

  render() {
    return (
      <Container>
        {" "}
        <ControlsContainer>
          <div>
            <Button buttonText="Run" active={this.state.gameActive === true} onClick={this.toggleSimulation.bind(this, "run")} />
            <Button buttonText="Pause" active={this.state.gameActive === false} onClick={this.toggleSimulation.bind(this, "pause")} />
            <Button buttonText="Shuffle" onClick={this.shuffle} />
            <Button buttonText="Clear" onClick={this.clear} />
          </div>
          <Generations>Generation: {this.state.generations}</Generations>
        </ControlsContainer>
        <GameContainer size={this.state.boardSize}>{this.renderBoard()}</GameContainer>
        <OptionContainer>
          <div>
            <h5>Simulation Speed</h5>

            <Options>
              <Button buttonText="Slow" active={this.state.simulationSpeed === 1000} onClick={this.handleSpeedChange.bind(this, 1000)} />
              <Button buttonText="Medium" active={this.state.simulationSpeed === 500} onClick={this.handleSpeedChange.bind(this, 500)} />
              <Button buttonText="Fast" active={this.state.simulationSpeed === 250} onClick={this.handleSpeedChange.bind(this, 250)} />
            </Options>
          </div>
          <div>
            <h5>Board Size</h5>

            <Options>
              <Button buttonText="40x40" active={this.state.boardSize === 40} onClick={this.handleResize.bind(this, 40)} />
              <Button buttonText="60x60" active={this.state.boardSize === 60} onClick={this.handleResize.bind(this, 60)} />
              <Button buttonText="80x80" active={this.state.boardSize === 80} onClick={this.handleResize.bind(this, 80)} />
            </Options>
          </div>
        </OptionContainer>
      </Container>
    );
  }
}
export default Board;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const GameContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 600px;
  border-right: 1px solid #697273;
  border-bottom: 1px solid #697273;
  margin: 0 auto;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 5px 10px 5px;
  align-items: center;
`;

const OptionContainer = styled.div`
  margin-top: 10px;
  justify-content: space-between;

  align-content: center;
  display: flex;
  h5 {
    margin: 0;
  }
`;

const Options = styled.div`display: flex;`;

const Generations = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  color: #80cf7c;
`;
