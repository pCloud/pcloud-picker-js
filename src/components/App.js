import React, { Component } from 'react';
import { PcloudButton, ItemsList } from '.';
import { getClient } from '../getToken';


class App extends Component {
  constructor() {
    super()

    this.state = { client: null };

    this._receiveToken = this._receiveToken.bind(this);
  }

  _receiveToken(token) {
    this.setState({ client: getClient(token) });
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
