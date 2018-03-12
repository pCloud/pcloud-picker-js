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
        id={folderId}
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
        <Header>Name</Header>
        {items.map(this._renderRow)}
      </Table>
    );
  }
}

export default ItemsList;

const Table = styled.div`
  border-bottom: 1px solid #E9E9E9;
  width: 50vw;
`;

const Header = styled.div`
  background: #F4F4F4;
  text-align: left;
  font-weight: bold;
  border-top: 1px solid #E9E9E9;
  border-bottom: 1px solid #E9E9E9;
  font-size: 11px;
  color: #B6B6B6;
  height: 27px;
  line-height: 26px;
`;