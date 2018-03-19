// @flow

import * as React from 'react';
import styled from 'styled-components';
import { List } from 'immutable';
import { NavigationFolder } from '.';

type folder = {
  folderName: string,
  items: null | List<any>
};

type NavigationProps = {
  path: List<number>,
  folders: Map<string, folder>,
  onNameClick: () => void
};

class Navigation extends React.Component<NavigationProps, {}> {
  constructor() {
    super();

    (this: any)._renderFolder = this._renderFolder.bind(this);
  }

  _getFolderName(folderId: string) {
    const { folders } = this.props;

    return folders.getIn([folderId, 'folderName']);
  }

  _renderFolder(folderId: number, index: number) {
    const { onNameClick } = this.props;
    const folderName = this._getFolderName(String(folderId));
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