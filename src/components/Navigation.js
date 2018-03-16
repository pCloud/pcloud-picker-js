import React, { Component } from 'react';
import styled from 'styled-components';
import { NavigationFolder } from '.';

class Navigation extends Component {
  constructor() {
    super();

    this._renderFolder = this._renderFolder.bind(this);
  }

  _getFolderName(folderId) {
    const { folders } = this.props;

    return folders.getIn([folderId.toString(), 'folderName']);
  }

  _renderFolder(folderId, index) {
    const { onNameClick } = this.props;
    const folderName = this._getFolderName(folderId);
    const shouldRenderIcon = index > 0;

    return (
      <NavigationFolder
        key={folderId.toString()}
        id={folderId}
        name={folderName}
        onNameClick={onNameClick}
        shouldRenderIcon={shouldRenderIcon}
      />
    );
  }

  render() {
    const { path } = this.props;

    return (
      //hadndle long path
      <Path>{path.map(this._renderFolder)}</Path>
    );
  }
}

export default Navigation;

const Path = styled.div`
  display: flex;
  padding-left: 10px;
`;