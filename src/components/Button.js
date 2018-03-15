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
  margin: 10px;
  height: 28px;
  width: 50px;
  text-align: center;
  line-height: 28px;
  background: #20bed6;
  color: #fff;
  padding: 0 20px;
  border-radius: 3px;
  user-select: none;
`;