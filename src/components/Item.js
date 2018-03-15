import React, { Component } from 'react';
import styled from 'styled-components';
import { getIcon } from '../utils';

class Item extends Component {
  constructor() {
    super();

    this._onDoubleClick = this._onDoubleClick.bind(this);
  }

  _onDoubleClick() {
    const { id, name, isFolder, onFolderDoubleClick } = this.props;

    if (isFolder) {
      onFolderDoubleClick(id, name);
    }
  }

  render() {
    const { name, iconId } = this.props;

    return (
      <Row onDoubleClick={this._onDoubleClick}>
        <img src={getIcon(iconId)} alt="icon" />
        <ItemName>{name}</ItemName>
      </Row>
    );
  }
}

export default Item;

const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
  &:hover {
    background-color: #f8f8f8;
  }
`;

const ItemName = styled.div`
  color: #000;
  margin-left: 10px;
  max-width: 429px;
  overflow: hidden;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
  text-overflow: ellipsis;
  user-select: none;
`;