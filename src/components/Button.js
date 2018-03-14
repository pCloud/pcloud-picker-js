import React, { Component } from 'react';
import styled from "styled-components";

class Button extends Component {

  render() {
    const { text, onButtonClick } = this.props;

    return (
      <DefaultButton onClick={onButtonClick}>{text}</DefaultButton>
    );
  }
}

export default Button;

const DefaultButton = styled.div`
  cursor: pointer;
  margin-right: 15px;
  height: 28px;
  width: 50px;
  text-align: center;
  line-height: 28px;
  background: #17bed0;
  color: #fff;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 3px;
`;