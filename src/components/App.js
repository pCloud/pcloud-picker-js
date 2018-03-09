import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import { PcloudButton, ItemsList } from '.';

class App extends Component {
  constructor() {
    super()

    this.state = { client: null };

    this._receiveToken = this._receiveToken.bind(this);
  }

  _getClient(token) {
    return pcloudSdk.createClient(token);
  }

  _receiveToken(token) {
    this.setState({ client: this._getClient(token) });
  }

  render() {
    const { client } = this.state;

    return (
      <div className="App">
        {client === null ?
          <PcloudButton receiveToken={this._receiveToken} /> :
          <ItemsList client={client} />
        }
      </div>
    );
  }
}

export default App;