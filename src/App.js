import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import styled from "styled-components";
import Board from "./components/Board";
import Footer from './components/Footer'

import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  position: relative;
  background-color: #f7f7f7;
`;

class App extends Component {
  constructor(props) {
    super(props);

    // page is at max 100vh but mouse scroll was still causing react to rerender components
    // causing the game of life simulation to lag, so stop that from registering
    window.onwheel = function() {
      return false;
    };
  }

  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          {/* Extra div to force board to middle of page */}
          <div/>
          <Board />
          <Footer/>
        </Container>
      </Provider>
    );
  }
}

export default App;
