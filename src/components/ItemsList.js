import React, { Component } from 'react';
import styled from 'styled-components';
import { Item } from '.';

class ItemsList extends Component {
  constructor() {
    super();

    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow({ id, iconId, name, isFolder }) {
    const { selectedItemId, onItemClick, onItemDoubleClick } = this.props;

    return (
      <Item
        key={id}
        id={id}
        iconId={iconId}
        name={name}
        isFolder={isFolder}
        isSelected={selectedItemId === id ? true : false}
        onItemClick={onItemClick}
        onItemDoubleClick={onItemDoubleClick}
      />
    );
  }

  _renderItems() {
    const { items } = this.props;

    return items.map(this._renderRow);
  }

  render() {
    const { items } = this.props;

    return (
      <Table>
        {items.size === 0 ?
          <EmptyFolder>This folder is emptry.</EmptyFolder> :
          this._renderItems()
        }
      </Table>
    );
  }
}

export default ItemsList;

const Table = styled.div`
  width: 100%;
  font-family: "Arial Narrow", Arial;
`;

const EmptyFolder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  font-size: 13px;
  color: #ababab;
`;