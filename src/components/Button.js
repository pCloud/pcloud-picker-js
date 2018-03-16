import React, { Component } from 'react';
import styled from 'styled-components';

class Button extends Component {

  render() {
    const { text, isDisabled, onButtonClick } = this.props;

    return (
      <DefaultButton
        isDisabled={isDisabled}
        onClick={isDisabled ? null : onButtonClick}
      >
        {text}
      </DefaultButton>
    );
  }
}

export default Button;

const DefaultButton = styled.div`
  cursor: ${props => props.isDisabled ? 'not-allowed' : 'pointer'};
  margin: 10px;
  height: 28px;
  width: 50px;
  text-align: center;
  line-height: 28px;
  background: ${props => props.isDisabled ? '#c1c1c1' : '#20bed6'};
  color: #fff;
  padding: 0 20px;
  border-radius: 3px;
  user-select: none;
`;