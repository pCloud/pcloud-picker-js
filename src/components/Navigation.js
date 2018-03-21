// @flow

import * as React from "react";
import styled from "styled-components";
import { List, Map } from "immutable";
import { NavigationFolder } from ".";

type folder = {
  folderName: string,
  items: null | List<any>
};

type NavigationProps = {
  path: List<string>,
  folders: Map<string, folder>,
  onNameClick: () => void
};

class Navigation extends React.Component<NavigationProps, {}> {
  static defaultProps = {
    path: [],
    folders: {},
    onNameClick: () => {}
  };

  constructor(props: NavigationProps) {
    super(props);

    (this: any)._renderFolder = this._renderFolder.bind(this);
  }

  _getFolderName(folderId: string): string {
    const { folders } = this.props;

    return folders.getIn([folderId, "folderName"], "");
  }

  _renderFolder(folderId: string, index: number) {
    const { onNameClick } = this.props;
    const folderName = this._getFolderName(folderId);
    const shouldRenderIcon = index > 0;

    return (
      <NavigationFolder
        key={folderId}
        id={folderId}
        name={folderName}
        onNameClick={onNameClick}
        shouldRenderIcon={shouldRenderIcon}
      />
    );
  }

  render() {
    const { path } = this.props;

    return <Path>{path.map(this._renderFolder)}</Path>;
  }
}

export default Navigation;

const Path = styled.div`
  display: flex;
  padding: 0 10px;
`;
