import React from "react";
import styled from "styled-components";

const StyledCell = styled.div`
  width: ${props => 600 / props.size - 1}px;
  height: ${props => 600 / props.size - 1}px;
  border-top: 1px solid #697273;
  border-left: 1px solid #697273;
  border-collapse: collapse;
  background: ${props => (props.status ? "#80CF7C" : "white")};
`;

export class Cell extends React.Component {
  //prevent cell from re-rendering if alive state is unchanged
  shouldComponentUpdate(nextProps) {
    return nextProps.size === this.props.size ? nextProps.status !== this.props.status : true;
  }
  render() {
    return <StyledCell size={this.props.size} status={this.props.status} onClick={this.props.onClick} />;
  }
}
export default Cell;
