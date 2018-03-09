import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import { Item } from '.';

class ItemsList extends Component {
  constructor() {
    super();

    this.state = { items: [] }

    this._renderRow = this._renderRow.bind(this)
  }

  componentWillMount() {
    const { client } = this.props;

    client.listfolder(0).then(res => res.contents).then(items => this.setState({ items: items }));
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