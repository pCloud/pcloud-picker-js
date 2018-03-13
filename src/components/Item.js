import React, { Component } from 'react';
import styled from "styled-components";

class Item extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { folderId, name, isFolder, onFolderClick } = this.props;

    if (isFolder) {
      onFolderClick(folderId, name);
    }
  }

  render() {
    const { id, name } = this.props;

    return (
      <Row onClick={this._onClick}>
          <ItemName>{name}</ItemName>
      </Row>
    );
  }
}

export default Item;

const Row = styled.div`
  display: flex;
  height: 37px;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid #E9E9E9;
  box-sizing: border-box;
`;

const Column = styled.div`
  height: 37px;
  width: 100%;
  padding-left: 10px;
  border: 1px solid #E9E9E9;
`;

const ItemName = styled.div`
  color: #000;
  font-size: 12px;
  max-width: 429px;
  overflow: hidden;
  font-family: Arial, Helvetica;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
  text-overflow: ellipsis;
`;