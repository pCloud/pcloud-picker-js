// @flow

import * as React from "react";
import styled, { keyframes } from "styled-components";
import { List, Map } from "immutable";
import { Navigation, ItemsList } from ".";
import { parseSelectedItem } from "../utils";
import type { selectedItemType } from "../utils";
import { ROOT_FOLDER_ID, ROOT_FOLDER_NAME } from "../config/constants";

type PickerProps = {
  isFolderSelectionOnly: boolean,
  getFolderContent: number => Promise<[any]>,
  onPick: any => void,
  onCancel: () => void
};

type folder = {
  folderName: string,
  items: null | List<any>
};

type PickerState = {
  path: List<string>,
  folders: Map<string, folder>,
  selectedItemId: string
};

const initialState = {
  path: List([ROOT_FOLDER_ID]),
  folders: Map({
    [ROOT_FOLDER_ID]: {
      folderName: ROOT_FOLDER_NAME,
      items: null
    }
  }),
  selectedItemId: ROOT_FOLDER_ID
};

class Picker extends React.Component<PickerProps, PickerState> {
  static defaultProps = {
    isFolderSelectionOnly: false,
    getFolderContent: () => null,
    onPick: () => {},
    onCancel: () => {}
  };

  constructor(props: PickerProps) {
    super(props);

    this.state = initialState;

    (this: any).onFolderDoubleClick = this.onFolderDoubleClick.bind(this);
    (this: any).onItemClick = this.onItemClick.bind(this);
    (this: any).onItemDoubleClick = this.onItemDoubleClick.bind(this);
    (this: any).onChooseButtonClick = this.onChooseButtonClick.bind(this);
    (this: any).onCancelButtonClick = this.onCancelButtonClick.bind(this);
    (this: any).onNavigationClick = this.onNavigationClick.bind(this);
  }

  getCurrentFolderId(): string {
    const { path } = this.state;

    return path.last() || ROOT_FOLDER_ID;
  }

  getSelectedItem(): selectedItemType | null {
    const { selectedItemId, folders } = this.state;
    const items = folders.getIn([this.getCurrentFolderId(), "items"], null);

    if (selectedItemId === this.getCurrentFolderId()) {
      return {
        id: selectedItemId,
        isFolder: true,
        name: folders.getIn([selectedItemId, "folderName"], "")
      };
    } else if (items !== null) {
      return parseSelectedItem(items.find(item => item.id === selectedItemId));
    }

    return null;
  }

  fetchCurrentFolderItems() {
    const { folders } = this.state;
    const { getFolderContent } = this.props;
    const currentFolderId = this.getCurrentFolderId();
    const currentItems = folders.getIn([currentFolderId, "items"], null);

    if (currentItems === null) {
      getFolderContent(+currentFolderId).then(items =>
        this.setState({
          folders: folders.setIn([currentFolderId, "items"], List(items))
        })
      );
    }
  }

  getPathToFolder(folderId: string) {
    const { path } = this.state;
    const indexOfCurrentId = path.indexOf(folderId);

    return path.slice(0, indexOfCurrentId + 1);
  }

  selectItem(id: string) {
    const { selectedItemId } = this.state;

    if (id !== selectedItemId) {
      this.setState({ selectedItemId: id });
    }
  }

  onFolderDoubleClick(folderId: string, name: string) {
    const { path, folders } = this.state;

    if (!folders.has(folderId)) {
      this.setState({
        folders: folders.set(folderId, {
          folderName: name,
          items: null
        }),
        path: path.push(folderId),
        selectedItemId: folderId
      });
    } else {
      this.setState({
        path: path.push(folderId),
        selectedItemId: folderId
      });
    }
  }

  onFileDoubleClick() {
    const { isFolderSelectionOnly } = this.props;

    if (!isFolderSelectionOnly) {
      this.onChooseButtonClick();
    }
  }

  onItemClick(id: string, isFolder: boolean) {
    const { isFolderSelectionOnly } = this.props;

    if (isFolder || !isFolderSelectionOnly) {
      this.selectItem(id);
    }
  }

  onItemDoubleClick(isFolder: boolean, id: string, name: string) {
    if (isFolder) {
      this.onFolderDoubleClick(id, name);
    } else {
      this.onFileDoubleClick();
    }
  }

  onCancelButtonClick() {
    const { onCancel } = this.props;

    onCancel();
  }

  onChooseButtonClick() {
    const { onPick } = this.props;

    onPick(this.getSelectedItem());
  }

  onNavigationClick(folderId: string) {
    this.setState({
      path: this.getPathToFolder(folderId),
      selectedItemId: folderId
    });
  }

  componentDidMount() {
    this.fetchCurrentFolderItems();
  }

  componentDidUpdate(
    prevProps: PickerProps,
    { folders: prevFolders }: PickerState
  ) {
    const { folders } = this.state;

    if (folders !== prevFolders) {
      this.fetchCurrentFolderItems();
    }
  }

  renderHeader() {
    const { path, folders } = this.state;

    return (
      <Header key="header">
        <Navigation
          path={path}
          folders={folders}
          onNameClick={this.onNavigationClick}
        />
      </Header>
    );
  }

  renderItems() {
    const { folders, selectedItemId } = this.state;
    const { isFolderSelectionOnly } = this.props;
    const currentFolderId = this.getCurrentFolderId();
    const currentItems = folders.getIn([currentFolderId, "items"], null);

    return (
      <Section key="section">
        {currentItems === null ? (
          <Loader />
        ) : (
          <ItemsList
            isFolderSelectionOnly={isFolderSelectionOnly}
            selectedItemId={selectedItemId}
            items={currentItems}
            onItemClick={this.onItemClick}
            onItemDoubleClick={this.onItemDoubleClick}
          />
        )}
      </Section>
    );
  }

  renderFooter() {
    return (
      <Footer key="footer">
        <CancelButton onClick={this.onCancelButtonClick}>Cancel</CancelButton>
        <ChooseButton isDisabled={false} onClick={this.onChooseButtonClick}>
          Choose
        </ChooseButton>
      </Footer>
    );
  }

  render() {
    return [this.renderHeader(), this.renderItems(), this.renderFooter()];
  }
}

export default Picker;

const Header = styled.header`
  border: 1px solid #e9e9e9;
  border-bottom: 0;
  box-sizing: border-box;
  background: #fff;
`;

const Section = styled.section`
  position: relative;
  height: 250px;
  border: 1px solid #e9e9e9;
  border-bottom: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  background: #fff;
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
  border: 4px solid #20bed6;
  border-radius: 30px;
  animation: ${Pulsate} 1s ease-out;
  animation-iteration-count: infinite;
  opacity: 0;
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border: 1px solid #e9e9e9;
  height: 70px;
  background: #fff;
`;

const DefaultButton = styled.div`
  cursor: pointer;
  background: #20bed6;
  color: #fff;
  margin: 10px;
  padding: 0 20px;
  height: 28px;
  max-width: 150px;
  min-width: 50px;
  width: auto;
  line-height: 28px;
  font-family: Arial, Helvetica;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  user-select: none;
`;

const ChooseButton = DefaultButton.extend`
  width: 50px;
`;
const CancelButton = DefaultButton.extend`
  background: #ffffff;
  border: 1px solid #e9e9e9;
  color: #999;
  width: 50px;
`;
