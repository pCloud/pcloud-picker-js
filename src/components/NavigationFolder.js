import React, { Component } from 'react';
import styled from "styled-components";
import ArrowIcon from '../img/arrow.png'

class NavigationFolder extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { id, onNameClick } = this.props;

    onNameClick(id)
  }

  render() {
    const { id, name, shouldRenderIcon } = this.props;

    return (
      <Wrapper>
        {shouldRenderIcon ? <img src={ArrowIcon} /> : null}
        <FolderName onClick={this._onClick}>{name}</FolderName>
      </Wrapper>
    );
  }
}

export default NavigationFolder;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  flex-directions: column;
`;

const FolderName = styled.div`
  cursor: pointer;
  font-weight: bold;
`;