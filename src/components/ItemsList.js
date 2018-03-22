// @flow

import * as React from "react";
import { List } from "immutable";
import styled from "styled-components";
import { Item } from ".";

type ItemsListProps = {
  selectedItemId: number,
  items: List<any>,
  onItemClick: () => void,
  onItemDoubleClick: () => void
};

class ItemsList extends React.Component<ItemsListProps, {}> {
  static defaultProps = {
    selectedItemId: "0",
    items: null,
    onItemClick: () => {},
    onItemDoubleClick: () => {}
  };

  constructor(props: ItemsListProps) {
    super(props);

    (this: any)._renderRow = this._renderRow.bind(this);
  }

  _renderRow(item: {
    id: string,
    iconId: number,
    name: string,
    isFolder: boolean
  }) {
    const { selectedItemId, onItemClick, onItemDoubleClick } = this.props;
    const { id, iconId, name, isFolder } = item;

    return (
      <Item
        key={id}
        id={id}
        iconId={iconId}
        name={name}
        isFolder={isFolder}
        isSelected={selectedItemId === id ? true : false}
        onItemClick={onItemClick}
        onItemDoubleClick={onItemDoubleClick}
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
        {items.size === 0 ? (
          <EmptyFolder>This folder is emptry.</EmptyFolder>
        ) : (
          this._renderItems()
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
