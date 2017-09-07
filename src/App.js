import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import styled from "styled-components";

import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100vw;
  overflow: hidden;
  position: relative;
  background-color: #f7f7f7;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="App">
          <div className="App-header">
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Container>
      </Provider>
    );
  }
}

export default App;
