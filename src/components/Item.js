import React, { Component } from 'react';
import styled from "styled-components";

class Item extends Component {
  constructor() {
    super();

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { id, name, isFolder, onFolderClick } = this.props;

    if (isFolder) {
      onFolderClick(id, name);
    }
  }

  render() {
    const { name, isFolder } = this.props;

    return (
      <Row onClick={this._onClick}>
          <ItemName>{name}</ItemName>
          {isFolder ? <SelectFolder>Select</SelectFolder>: null}
      </Row>
    );
  }
}

export default Item;

const SelectFolder = styled.div`
  display: none;
  cursor: pointer;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  height: 37px;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #E9E9E9;
  font-size: 12px;
  box-sizing: border-box;
  &:hover ${SelectFolder} {
    display: block;
  }
`;

const ItemName = styled.div`
  color: #000;
  max-width: 429px;
  overflow: hidden;
  font-family: Arial, Helvetica;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
  text-overflow: ellipsis;
`;