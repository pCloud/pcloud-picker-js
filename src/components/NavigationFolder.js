import React, { Component } from 'react';
import styled from "styled-components";

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
    const { id, name, shouldRenderSlash } = this.props;

    return (
      <Wrapper>
        {shouldRenderSlash ? <span>/ </span> : null}
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
  padding: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
`;