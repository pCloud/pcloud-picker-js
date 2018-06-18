// @flow

import * as React from "react";
import { List } from "immutable";
import styled from "styled-components";
import { Item } from ".";

type ItemsListProps = {
  isFolderSelectionOnly: boolean,
  selectedItemId: number,
  items: List<any>,
  onItemClick: () => void,
  onItemDoubleClick: () => void
};

class ItemsList extends React.Component<ItemsListProps, {}> {
  static defaultProps = {
    isFolderSelectionOnly: false,
    selectedItemId: "0",
    items: null,
    onItemClick: () => {},
    onItemDoubleClick: () => {}
  };

  constructor(props: ItemsListProps) {
    super(props);

    (this: any).renderRow = this.renderRow.bind(this);
  }

  renderRow(item: {
    id: string,
    iconId: number,
    name: string,
    isFolder: boolean
  }) {
    const {
      isFolderSelectionOnly,
      selectedItemId,
      onItemClick,
      onItemDoubleClick
    } = this.props;
    const { id, iconId, name, isFolder } = item;

    return (
      <Item
        key={id}
        id={id}
        iconId={iconId}
        name={name}
        isFolderSelectionOnly={isFolderSelectionOnly}
        isFolder={isFolder}
        isSelected={selectedItemId === id ? true : false}
        onItemClick={onItemClick}
        onItemDoubleClick={onItemDoubleClick}
      />
    );
  }

  renderItems() {
    const { items } = this.props;

    return items.map(this.renderRow);
  }

  render() {
    const { items } = this.props;

    return (
      <Table>
        {items.size === 0 ? (
          <EmptyFolder>This folder is emptry.</EmptyFolder>
        ) : (
          this.renderItems()
        )}
      </Table>
    );
  }
}

export default ItemsList;

const Table = styled.div`
  width: 100%;
  font-family: "Arial Narrow", Arial;
`;

export const EmptyFolder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 13px;
  color: #ababab;
`;
