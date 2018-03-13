import React, { Component } from 'react';
import styled from "styled-components";
import { Item } from '.';

class ItemsList extends Component {
  constructor() {
    super();
    
    this._renderRow = this._renderRow.bind(this);
  }

  _renderRow({ id, folderId, name, isFolder }) {
    const { onFolderClick } = this.props;

    return (
      <Item
        key={id}
        folderId={folderId}
        name={name}
        isFolder={isFolder}
        onFolderClick={onFolderClick}
      />
    );
  }

  render() {
    const { items } = this.props;

    return (
      <Table>
        {items.map(this._renderRow)}
      </Table>
    );
  }
}

export default ItemsList;

const Table = styled.div`
  width: 50vw;
`;