import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import styled from "styled-components";
import { List, Map } from 'immutable';
import { PcloudButton, Navigation, ItemsList } from '.';
import { parseItem } from '../utils'

class App extends Component {
  constructor() {
    super();

    this.state = {
      isReady: false,
      path: List([0]),
      folders: Map({
        0: Map({
          folderName: 'pCloud',
          items: null
        })
      })
    };

    this._client = null;
    this._receiveToken = this._receiveToken.bind(this);
    this._onFolderClick = this._onFolderClick.bind(this);
    this._onFileClick = this._onFileClick.bind(this);
    this._onNavigationClick = this._onNavigationClick.bind(this);
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

  _fetchItems(folderId) {
    return this._client.listfolder(folderId)
      .then(res => res.contents)
      .then(items => items.map(parseItem));
  }

  _setItems() {
    const { path, folders } = this.state;
    const currentFolderId = path.last();
    const currentItems = folders.getIn([currentFolderId.toString(), 'items']);

    if (currentItems === null) {
      this._fetchItems(currentFolderId)
        .then(items => this.setState({
          folders: folders.setIn([currentFolderId.toString(), 'items'], List(items))
        }));
    }
  }

  _onFolderClick(folderId, name) {
    const { path, folders } = this.state;

    this.setState({
      folders: folders.set(folderId.toString(), Map({
        folderName: name,
        items: null
      })),
      path: path.push(folderId)
    });
  }

  _onFileClick() {

  }

  _onNavigationClick(folderId) {
    const { path } = this.state;
    const indexOfCurrentId = path.indexOf(folderId);

    this.setState({
      path: path.slice(0, indexOfCurrentId + 1)
    });
  }

  componentDidUpdate(prevProps, { folders: prevFolders }) {
    const { folders } = this.state;

    if (folders !== prevFolders) {
      this._setItems();
    }
  }

  _renderNavigation() {
    const { path, folders } = this.state;

    return (
      <Navigation
        path={path}
        folders={folders}
        onNameClick={this._onNavigationClick}
      />
    );
  }

  _renderItems() {
    const { path, folders } = this.state;
    const currentFolderId = path.last();
    const currentItems = folders.getIn([currentFolderId.toString(), 'items']);

    if (currentItems === null) {
      return null;
    }

    return (
      <ItemsList
        items={currentItems}
        onFolderClick={this._onFolderClick}
      />
    );
  }

  render() {
    const { isReady } = this.state;

    return (
      <Wrapper>
        {isReady ?
          <div>
            {this._renderNavigation()}
            <Section>{this._renderItems()}</Section>
          </div> :
          <PcloudButton receiveToken={this._receiveToken} />
        }
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  width: 50vw;
  margin: 10px;
`;

const Section = styled.section`
  height: 250px;
  border: 1px solid #E9E9E9;
  box-sizing: border-box;
  overflow-x: hidden;
`;