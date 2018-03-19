// @flow

import * as React from 'react';
import styled from 'styled-components';
import ArrowIcon from '../img/arrow.png';

type NavigationFolderProps = {
  id: string,
  name: string,
  onNameClick: (string) => void,
  shouldRenderIcon: boolean
};

class NavigationFolder extends React.Component<NavigationFolderProps, {}> {
  constructor() {
    super();

    (this: any)._onClick = this._onClick.bind(this);
  }

  _onClick() {
    const { id, onNameClick } = this.props;

    onNameClick(id)
  }

  render() {
    const { name, shouldRenderIcon } = this.props;

    return (
      <Wrapper>
        {shouldRenderIcon ? <img src={ArrowIcon} alt="arrow-icon" /> : null}
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
`;

const FolderName = styled.div`
  cursor: pointer;
  font-weight: bold;
  color: #595959;
`;