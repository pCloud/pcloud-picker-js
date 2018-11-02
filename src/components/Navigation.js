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

class Navigation extends React.PureComponent<NavigationProps, {}> {
  static defaultProps = {
    path: List(),
    folders: Map(),
    onNameClick: () => {}
  };

  constructor(props: NavigationProps) {
    super(props);

    (this: any).renderFolder = this.renderFolder.bind(this);
  }

  getFolderName(folderId: string): string {
    const { folders } = this.props;

    return folders.getIn([folderId, "folderName"], "");
  }

  renderFolder(onNameClick: () => void) {
    return (folderId: string, index: number) => {
      const folderName = this.getFolderName(folderId);
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
    };
  }

  render() {
    const { path, onNameClick } = this.props;

    return <Path>{path.map(this.renderFolder(onNameClick))}</Path>;
  }
}

export default Navigation;

const Path = styled.div`
  display: flex;
  padding: 0 10px;
`;
