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
      currentFolderId: 0,
      path: List(),
      folders: List(
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
    this._onFileClick = this._onFileClick.bind(this);
    this._onNavigationClick = this._onNavigationClick.bind(this);
  }

  componentDidUpdate(prevProps, { folders: prevFolders }) {
    const { folders } = this.state;

    if (folders !== prevFolders) {
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

  _fetchItems(client, folderId) {
    return client.listfolder(folderId)
      .then(res => res.contents)
      .then(items => items.map(parseItem));
  }

  _setItems() {
    const { folders } = this.state;
    const folderId = folders.last().get('folderId');
    const items = folders.last().get('items');

    if (this._client === null) {
      return
    }

    if (items === null) {
      this._fetchItems(this._client, folderId)
        .then(items => this.setState({
          folders: folders.setIn([-1, 'items'], List(items))
        }));
    }
  }

  _onFolderClick(folderId, name) {
    const { folders } = this.state;

    this.setState({
      folders: folders.push(Map({
        folderId: folderId,
        folderName: name,
        items: null
      })),
      currentFolderId: folderId
    });
  }
  /*
  _buildPath() {

  }

  _onFileClick() {

  }

  _onNavigationClick() {

  }
  */

  render() {
    const { isReady, folders, path, currentFolderId } = this.state;
    const items = folders.last().get('items');

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