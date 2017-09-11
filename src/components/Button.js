import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: ${props => (props.active ? "#80CF7C" : "white")};
  color: ${props => (props.active ? "white" : "black")};
  padding: 4px 11px;
  margin: 5px;
  cursor: pointer;
  border: none;
  box-shadow: 0 4px 8px rgba(105, 114, 115, 0.16), 0 3px 6px rgba(105, 114, 115, 0.23);
  transition: 0.5s ease-in-out;
  outline: none;
  &:hover {
    transition: 0.5s ease-in-out;
    box-shadow: 0 9px 18px rgba(71, 115, 69, 0.29), 0 5px 5px rgba(71, 115, 69, 0.33);
  }
`;

export class Button extends React.Component {
  render() {
    return (
      <StyledButton active={this.props.active} onClick={this.props.onClick}>
        {this.props.buttonText}
      </StyledButton>
    );
  }
}
export default Button;
