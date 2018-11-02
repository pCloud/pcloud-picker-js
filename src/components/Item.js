// @flow

import * as React from "react";
import styled from "styled-components";
import { getIcon } from "../utils";

type ItemProps = {
  mode: string,
  id: string,
  iconId: number,
  name: string,
  isFolderSelectionOnly: boolean,
  isFolder: boolean,
  isSelected: boolean,
  onItemClick: (id: string, isFolder: boolean) => void,
  onItemDoubleClick: (isFolder: boolean, id: string, name: string) => void
};

class Item extends React.PureComponent<ItemProps, {}> {
  static defaultProps = {
    id: "0",
    iconId: 0,
    name: "",
    isFolderSelectionOnly: false,
    isFolder: false,
    isSelected: false,
    onItemClick: () => {},
    onItemDoubleClick: () => {}
  };

  constructor(props: ItemProps) {
    super(props);

    (this: any).onClick = this.onClick.bind(this);
    (this: any).onDoubleClick = this.onDoubleClick.bind(this);
  }

  onClick() {
    const { id, isFolder, onItemClick } = this.props;

    onItemClick(id, isFolder);
  }

  onDoubleClick() {
    const { id, name, isFolder, onItemDoubleClick } = this.props;

    onItemDoubleClick(isFolder, id, name);
  }

  render() {
    const {
      name,
      iconId,
      isFolderSelectionOnly,
      isSelected,
      isFolder
    } = this.props;
    const isSelectionDisabled = isFolderSelectionOnly && !isFolder;
    const itemIcon = isSelectionDisabled ? 0 : iconId;

    return (
      <Row
        isSelectionDisabled={isSelectionDisabled}
        isSelected={isSelected}
        onClick={this.onClick}
        onDoubleClick={this.onDoubleClick}
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
