import React, { Component } from 'react';
import styled from "styled-components";
import { Item } from '.';

class ItemsList extends Component {
  constructor() {
    super();

    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow({ id, name, isFolder }) {
    const { onFolderClick } = this.props;

    return (
      <Item
        key={id}
        id={id}
        name={name}
        isFolder={isFolder}
        onFolderClick={onFolderClick}
      />
    );
  }

  _renderItems() {
    const { items } = this.props;

    return items.map(this._renderRow)
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
`;

const EmptyFolder = styled.div`
  width: 100%;
  height: 100%;
`;