import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import styled, { keyframes } from "styled-components";
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
    this._onFolderSelect = this._onFolderSelect.bind(this);
    this._onFileSelect = this._onFileSelect.bind(this);
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

    if (!folders.has(folderId.toString())) {
      this.setState({
        folders: folders.set(folderId.toString(), Map({
          folderName: name,
          items: null
        }))
      });
    }

    this.setState({ path: path.push(folderId) })
  }

  _onFolderSelect() {

  }

  _onFileSelect() {

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

  _renderHeader() {
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

    return (
      <div>
        {currentItems === null ?
          <Loader /> :
          <ItemsList
            items={currentItems}
            onFolderClick={this._onFolderClick}
          />
        }
      </div>
    );
  }

  _renderFooter() {
    return (
      <Footer>
        <Button>Choose</Button>
        <Button>Cancel</Button>
      </Footer>
    );
  }

  render() {
    const { isReady } = this.state;

    return (
      <Wrapper>
        {isReady ?
          <Picker>
            <Header>{this._renderHeader()}</Header>
            <Section>{this._renderItems()}</Section>
            {this._renderFooter()}
          </Picker> :
          <PcloudButton receiveToken={this._receiveToken} />
        }
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  margin: 10px;
`;

const Picker = styled.div`
  width: 50vw;
`;

const Header = styled.header`
  background: #F4F4F4;
  border: 1px solid #E9E9E9;
  border-bottom: 0;
  box-sizing: border-box;
`;

const Section = styled.section`
  position: relative;
  height: 250px;
  border: 1px solid #E9E9E9;
  border-bottom: 0;
  box-sizing: border-box;
  overflow-x: hidden;
`;

const Pulsate = keyframes`
  0% {transform: scale(0.1, 0.1); opacity: 0;}
  50% {opacity: 1;}
  100% {transform: scale(1.2, 1.2); opacity: 0;}
`;

const Loader = styled.div`
position: absolute;
width: 50px;
height: 50px;
top: 50%;
left: 50%;
margin: -25px 0 0 -25px;
border: 4px solid #17bed0;
border-radius: 30px;
-webkit-animation: ${Pulsate} 1s ease-out;
-moz-animation: ${Pulsate} 1s ease-out;
-o-animation: ${Pulsate} 1s ease-out;
animation: ${Pulsate} 1s ease-out;
-webkit-animation-iteration-count: infinite;
-moz-animation-iteration-count: infinite;
-o-animation-iteration-count: infinite;
animation-iteration-count: infinite;
opacity: 0;
`;

const Button = styled.div`
  margin: 10px;
`;

const Footer = styled.footer`
  display: flex;
  border: 1px solid #E9E9E9;
  height: 70px;
`;