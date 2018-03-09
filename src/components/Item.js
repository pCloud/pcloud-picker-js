import React, { Component } from 'react';

class Item extends Component {
  render() {
    const { id, name, isFolder } = this.props;

    return (
      <div key={id} className="row">
        <div>
          <input type="checkbox" />
        </div>
        <div>
          {name}
        </div>
      </div>
    );
  }
}

export default Item;