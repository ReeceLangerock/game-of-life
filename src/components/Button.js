import React from "react";
import styled, { injectGlobal } from "styled-components";

const StyledHeader = styled.div``;

export class Button extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.buttonText}</button>;
  }
}
export default Button;
