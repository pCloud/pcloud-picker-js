import React, { Component } from 'react';
import styled from "styled-components";

class Item extends Component {
  constructor() {
    super();

    this._onNameClick = this._onNameClick.bind(this);
  }

  _onNameClick() {
    const { onClick, isFolder, id, name } = this.props;

    onClick(isFolder, id, name);
    
  }

  render() {
    const { id, name, isFolder } = this.props;

    return (
      <Row key={id} className="row">
        <Column checkbox>
          <CheckBox type="checkbox" />
        </Column>
        <Column>
          <ItemName onClick={this._onNameClick}>{name}</ItemName>
        </Column>
      </Row>
    );
  }
}

export default Item;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  height: 37px;
  width: ${props => props.checkbox ? 'auto' : '100%'};
  padding-left: 10px;
  border: 1px solid #E9E9E9;
  `;
  
  const CheckBox = styled.input`
  vertical-align: top;
  text-align: center;
  border-right: none;
  `;
  
  const ItemName = styled.div`
  color: #000;
  padding-left: 0;
  border-left: none;
  border-bottom: none;
  font-size: 12px;
  max-width: 429px;
  overflow: hidden;
  font-family: Arial, Helvetica;
  text-shadow: 0px 1px 0px rgba(255,255,255,0.5);
  text-overflow: ellipsis;
`;