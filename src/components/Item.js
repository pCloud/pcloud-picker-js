import React, { Component } from 'react';
import styled from 'styled-components';
import { getIcon, debounce } from '../utils';

class Item extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
  }

  _onClick() {
    const { id, onItemClick } = this.props;

    onItemClick(id)
  }

  _onDoubleClick() {
    const { id, name, isFolder, onItemDoubleClick } = this.props;

    onItemDoubleClick(isFolder, id, name);
  }

  render() {
    const { name, iconId, isSelected } = this.props;

    return (
      <Row
        isSelected={isSelected}
        onClick={debounce(this._onClick)}
        onDoubleClick={this._onDoubleClick}
      >
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
  background: ${props => props.isSelected ? '#f8f8f8' : '#fff'};
  &:hover {
    background-color: #f8f8f8;
  }
  box-sizing: border-box;
`;

const ItemName = styled.div`
  margin-left: 10px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap; 
  text-overflow: ellipsis;
  word-break: break-all;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
  user-select: none;
`;