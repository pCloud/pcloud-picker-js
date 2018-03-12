import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import styled from "styled-components";
import { List, Map } from 'immutable';
import { PcloudButton, Navigation, ItemsList } from '.';
import { parseItem } from '../utils'

class App extends Component {
  constructor() {
    super()

    this.state = {
      isReady: false,
      path: List(
        [
          Map({
            folderId: 0,
            folderName: 'pCloud',
            items: null
          })
        ]
      )
    };

    this._client = null;
    this._receiveToken = this._receiveToken.bind(this);
    this._onFolderClick = this._onFolderClick.bind(this);
  }

  componentDidUpdate({ }, { path: prevPath }) {
    const { path } = this.state;

    if (path !== prevPath) {
      this._setItems();
    }
  }

  _receiveToken(token) {
    this._client = this._getClient(token);

    this._setItems();
    this.setState({ isReady: true });
  }

  _getClient(token) {
    //handle errors
    return pcloudSdk.createClient(token);
  }

  _setItems() {
    const { path } = this.state;
    const folderId = path.last().get('folderId');
    const items = path.last().get('items');

    if (this._client === null) {
      return
    }

    if (items === null) {
      this._client.listfolder(folderId)
        .then(res => res.contents)
        .then(items => this.setState({ path: path.setIn([-1, 'items'], List(items.map(parseItem))) }));
    }
  }

  _onFolderClick(folderId, name) {
    const { path } = this.state;

    this.setState({
      path: path.push(Map({
        folderId: folderId,
        folderName: name,
        items: null
      }))
    });
  }

  _onFileClick() {

  }

  render() {
    const { isReady, path } = this.state;
    const items = path.last().get('items');

    return (
      <Wrapper>
        {isReady ?
          <div>
            <Navigation path={path} />
            {items !== null ?
              <ItemsList items={items} onFolderClick={this._onFolderClick} /> :
              null
            }
          </div> :
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