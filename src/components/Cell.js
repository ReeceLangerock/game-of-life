import React from "react";
import styled, { injectGlobal } from "styled-components";

const StyledCell = styled.div`
  width: ${props => 500 / props.size - 1}px;
  height: ${props => 500 / props.size - 1}px;

  // width: 6px;
  // height: 6px;
  border-top: 1px solid;
  border-left: 1px solid;
  border-collapse: collapse;
  background: ${props => (props.status ? "green" : "white")};
`;

export class Cell extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.status !== this.props.status
}
  render() {
    return <StyledCell size={this.props.size} status={this.props.status} onClick={this.props.onClick} />;
  }
}
export default Cell;
