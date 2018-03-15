import React, { Component } from 'react';
import styled from "styled-components";
import { Item } from '.';

class ItemsList extends Component {
  constructor() {
    super();

    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow({ id, iconId, name, isFolder }) {
    const { onFolderDoubleClick } = this.props;

    return (
      <Item
        key={id}
        id={id}
        iconId={iconId}
        name={name}
        isFolder={isFolder}
        onFolderDoubleClick={onFolderDoubleClick}
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
`;

const EmptyFolder = styled.div`
  width: 100%;
  height: 100%;
`;