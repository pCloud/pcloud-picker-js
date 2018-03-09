import React, { Component } from 'react';
import { getToken } from '../getToken';

class PcloudButton extends Component {
  constructor() {
    super();

    this._onButtonClick = this._onButtonClick.bind(this);

  }

  _onButtonClick() {
    const { receiveToken } = this.props;

    getToken(receiveToken);
  }

  render() {
    return (
      <div className="btn" onClick={this._onButtonClick}>pCloud</div>
    );
  }
}

export default PcloudButton;