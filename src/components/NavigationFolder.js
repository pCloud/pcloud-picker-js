// @flow

import * as React from "react";
import styled from "styled-components";
import ArrowIcon from "../img/arrow.png";
import { ROOT_FOLDER_ID, ROOT_FOLDER_NAME } from "../config/constants";

type NavigationFolderProps = {
  id: string,
  name: string,
  onNameClick: string => void,
  shouldRenderIcon: boolean
};

class NavigationFolder extends React.Component<NavigationFolderProps, {}> {
  static defaultProps = {
    id: ROOT_FOLDER_ID,
    name: ROOT_FOLDER_NAME,
    onNameClick: () => {},
    shouldRenderIcon: false
  };

  constructor(props: NavigationFolderProps) {
    super(props);

    (this: any)._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { id, onNameClick } = this.props;

    onNameClick(id);
  }

  render() {
    const { name, shouldRenderIcon } = this.props;

    return (
      <Wrapper>
        {shouldRenderIcon && <img src={ArrowIcon} alt="arrow-icon" />}
        <FolderName onClick={this._onClick}>{name}</FolderName>
      </Wrapper>
    );
  }
}

export default NavigationFolder;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  flex-directions: column;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const FolderName = styled.div`
  cursor: pointer;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-width: 100px;
  color: #595959;
`;
