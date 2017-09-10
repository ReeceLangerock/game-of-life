import React from "react";
import styled, { injectGlobal } from "styled-components";
import Button from './Button'

const StyledHeader = styled.div``;

export class ButtonContainer extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onRun}buttonText ='Run'/>
        <Button onClick={this.props.onPause} buttonText ='Pause'/>
        <Button onClick={this.props.clear}buttonText ='Clear'/>
      </div>
    );
  }
}
export default ButtonContainer;
