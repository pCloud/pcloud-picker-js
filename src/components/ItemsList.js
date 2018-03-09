import React, { Component } from 'react';
import { Item } from '.';
import { getItems } from '../getItems';

class ItemsList extends Component {
  constructor() {
    super();

    this.state = { items: [] }

    this._renderRow = this._renderRow.bind(this)
  }

  componentWillMount() {
    const { client } = this.props;

    getItems(client).then(items => this.setState({ items: items }));
  }

  _renderRow({ id, name, isFolder }) {
    return (
      <Item
        id={id}
        name={name}
        isFolder={isFolder}
      />
    );
  }

  render() {
    const { items } = this.state;

    return (
      <div className="table">
        <div className="th">Name</div>
        {items.map(this._renderRow)}
      </div>
    );
  }
}

export default ItemsList;