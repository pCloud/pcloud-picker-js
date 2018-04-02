// @flow

import * as React from "react";
import styled from "styled-components";
import { getIcon } from "../utils";

type ItemProps = {
  mode: string,
  id: string,
  iconId: number,
  name: string,
  isItemDisabled: boolean,
  isFolder: boolean,
  isSelected: boolean,
  onItemClick: (id: string, isFolder: boolean) => void,
  onItemDoubleClick: (isFolder: boolean, id: string, name: string) => void
};

class Item extends React.Component<ItemProps, {}> {
  static defaultProps = {
    id: "0",
    iconId: 0,
    name: "",
    isItemDisabled: false,
    isFolder: false,
    isSelected: false,
    onItemClick: () => {},
    onItemDoubleClick: () => {}
  };

  constructor(props: ItemProps) {
    super(props);

    (this: any)._onClick = this._onClick.bind(this);
    (this: any)._onDoubleClick = this._onDoubleClick.bind(this);
  }

  _onClick() {
    const { id, isFolder, onItemClick } = this.props;

    onItemClick(id, isFolder);
  }

  _onDoubleClick() {
    const { id, name, isFolder, onItemDoubleClick } = this.props;

    onItemDoubleClick(isFolder, id, name);
  }

  render() {
    const { name, iconId, isItemDisabled, isSelected, isFolder } = this.props;
    const isFileDisabled = isItemDisabled && !isFolder;
    const itemIcon = isFileDisabled ? 0 : iconId;

    return (
      <Row
        isDisabled={isFileDisabled}
        isSelected={isSelected}
        onClick={this._onClick}
        onDoubleClick={this._onDoubleClick}
      >
        <img src={getIcon(itemIcon)} alt="icon" />
        <ItemName>{name}</ItemName>
      </Row>
    );
  }
}

export default Item;

export const Row = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: ${props => (props.isSelected ? "#eaeaea" : "#fff")};
  &:hover {
    background-color: ${props => (props.isSelected ? "#eaeaea" : "#f8f8f8")};
  }
  box-sizing: border-box;
`;

export const ItemName = styled.div`
  margin-left: 10px;
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
  text-shadow: 0px 1px 0px rgba(255, 255, 255, 0.5);
  user-select: none;
`;
