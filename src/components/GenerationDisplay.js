import React from "react";
import styled, { injectGlobal } from "styled-components";

const StyledHeader = styled.div``;

export class GenerationDisplay extends React.Component {
  render() {
    return <div >{this.props.generationCount}</div>;
  }
}
export default GenerationDisplay;
