import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import styled from "styled-components";
import { PcloudButton, ItemsList } from '.';

class App extends Component {
  constructor() {
    super()

    this.state = { isReady: false };

    this._client = null;
    this._receiveToken = this._receiveToken.bind(this);
  }

  _getClient(token) {
    return pcloudSdk.createClient(token);
  }

  _receiveToken(token) {
    this._client = this._getClient(token);

    if (this._client !== null) {
      this.setState({ isReady: true });
    }
  }

  render() {
    const { isReady } = this.state;

    return (
      <Wrapper>
        {isReady ?
           <ItemsList client={this._client} /> :
           <PcloudButton receiveToken={this._receiveToken} />
        }
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`