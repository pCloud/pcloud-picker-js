// @flow

import * as React from "react";
import pcloudSdk from "pcloud-sdk-js";
import styled, { keyframes } from "styled-components";
import { List, Map } from "immutable";
import { Navigation, ItemsList, Modal } from ".";
import { parseItem, parseSelectedItem } from "../utils";
import type { selectedItemType } from "../utils";
import { ROOT_FOLDER_ID, ROOT_FOLDER_NAME } from "../config/constants";

const MODAL_CLASS = "pcloud-modal";
const BODY = global.document.querySelector("body");

const initialState = {
  isAuthenticated: false,
  isModalOpen: false,
  path: List([ROOT_FOLDER_ID]),
  folders: Map({
    [ROOT_FOLDER_ID]: {
      folderName: ROOT_FOLDER_NAME,
      items: null
    }
  }),
  selectedItemId: ROOT_FOLDER_ID
};

const resetState = {
  isModalOpen: false,
  path: List([ROOT_FOLDER_ID]),
  folders: Map({
    [ROOT_FOLDER_ID]: {
      folderName: ROOT_FOLDER_NAME,
      items: null
    }
  }),
  selectedItemId: ROOT_FOLDER_ID
};

type PickerProps = {
  mode: string,
  clientId: string,
  redirectUri: string,
  buttonText: string,
  fileUrl: string,
  onSuccess: () => void,
  onSelect: any => void,
  onError: any => void,
  onClose: () => void
};

type folder = {
  folderName: string,
  items: null | List<any>
};

type PickerState = {
  isAuthenticated: boolean,
  isModalOpen: boolean,
  path: List<string>,
  folders: Map<string, folder>,
  selectedItemId: string
};

class Picker extends React.Component<PickerProps, PickerState> {
  static defaultProps = {
    clientId: "",
    redirectUri: "",
    onSelect: () => {},
    onClose: () => {},
    fileUrl: "",
    onSuccess: () => {},
    onError: () => {}
  };

  constructor(props: PickerProps) {
    super(props);

    this.state = initialState;

    (this: any)._client = null;
    (this: any)._receiveToken = this._receiveToken.bind(this);
    (this: any)._getToken = this._getToken.bind(this);
    (this: any)._onFolderDoubleClick = this._onFolderDoubleClick.bind(this);
    (this: any)._onItemClick = this._onItemClick.bind(this);
    (this: any)._onItemDoubleClick = this._onItemDoubleClick.bind(this);
    (this: any)._onChooseButtonClick = this._onChooseButtonClick.bind(this);
    (this: any)._onCloseButtonClick = this._onCloseButtonClick.bind(this);
    (this: any)._onNavigationClick = this._onNavigationClick.bind(this);
  }

  _getToken() {
    const { clientId, redirectUri } = this.props;
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      pcloudSdk.oauth.initOauthToken({
        client_id: clientId,
        redirect_uri: redirectUri,
        receiveToken: this._receiveToken
      });
    }

    this.setState({ isModalOpen: true });
  }

  _receiveToken(token: string) {
    (this: any)._client = this._getClient(token);

    this._setItems();
    this.setState({ isAuthenticated: true });
  }

  _getClient(token: string) {
    // handle errors
    return pcloudSdk.createClient(token);
  }

  _fetchItems(folderId: number) {
    return (this: any)._client
      .listfolder(folderId, { iconformat: "id" })
      .then(res => res.contents)
      .then(items => items.map(parseItem))
      .catch(err => {
        console.log(err);
      });
  }

  _uploadFile() {
    const { fileUrl } = this.props;
    const { selectedItemId } = this.state;

    (this: any)._client
      .remoteupload(fileUrl, selectedItemId)
      .then(data => {
        if (data !== null) {
          this.setState(resetState);
        }
      })
      .catch(err => console.log(err));
  }

  _getCurrentFolderId(): string {
    const { path } = this.state;

    return path.last() || ROOT_FOLDER_ID;
  }

  _getSelectedItem(): selectedItemType | null {
    const { selectedItemId, folders } = this.state;
    const items = folders.getIn([this._getCurrentFolderId(), "items"], null);

    if (selectedItemId === this._getCurrentFolderId()) {
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

  _setItems() {
    const { folders } = this.state;
    const currentFolderId = this._getCurrentFolderId();
    const currentItems = folders.getIn([currentFolderId, "items"], null);

    if (currentItems === null) {
      this._fetchItems(+currentFolderId).then(items =>
        this.setState({
          folders: folders.setIn([currentFolderId, "items"], List(items))
        })
      );
    }
  }

  _getPath(folderId: string) {
    const { path } = this.state;
    const indexOfCurrentId = path.indexOf(folderId);

    return path.slice(0, indexOfCurrentId + 1);
  }

  _selectItem(id: string) {
    const { selectedItemId } = this.state;

    if (id !== selectedItemId) {
      this.setState({ selectedItemId: id });
    }
  }

  _onFolderDoubleClick(folderId: string, name: string) {
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

  _onFileDoubleClick() {
    const { mode } = this.props;

    if (mode === "select") {
      this._onChooseButtonClick();
    }
  }

  _onItemClick(id: string, isFolder: boolean) {
    const { mode } = this.props;

    if (mode === "upload" && isFolder) {
      this._selectItem(id);
    }

    if (mode === "select") {
      this._selectItem(id);
    }
  }

  _onItemDoubleClick(isFolder: boolean, id: string, name: string) {
    if (isFolder) {
      this._onFolderDoubleClick(id, name);
    } else {
      this._onFileDoubleClick();
    }
  }

  _onCloseButtonClick() {
    const { onClose } = this.props;

    onClose();

    this.setState(resetState);
  }

  _onChooseButtonClick() {
    const { mode, onSelect } = this.props;

    if (mode === "select") {
      onSelect(this._getSelectedItem());
      this.setState(resetState);
    }

    if (mode === "upload") {
      this._uploadFile();
    }
  }

  _onNavigationClick(folderId: string) {
    this.setState({
      path: this._getPath(folderId),
      selectedItemId: folderId
    });
  }

  componentWillMount() {
    const modal = document.createElement("div");
    modal.setAttribute("id", MODAL_CLASS);
    BODY.appendChild(modal);
  }

  componentDidUpdate(
    prevProps: PickerProps,
    { folders: prevFolders }: PickerState
  ) {
    const { folders } = this.state;

    if (folders !== prevFolders) {
      this._setItems();
    }
  }

  componentWillUnmount() {
    const elModal = document.getElementById(MODAL_CLASS);
    BODY.removeChild(elModal);
  }

  _renderHeader() {
    const { path, folders } = this.state;

    return (
      <Header>
        <Navigation
          path={path}
          folders={folders}
          onNameClick={this._onNavigationClick}
        />
      </Header>
    );
  }

  _renderItems() {
    const { folders, selectedItemId } = this.state;
    const { mode } = this.props;
    const isItemDisabled = mode === "upload";
    const currentFolderId = this._getCurrentFolderId();
    const currentItems = folders.getIn([currentFolderId, "items"], null);

    return (
      <Section>
        {currentItems === null ? (
          <Loader />
        ) : (
          <ItemsList
            isItemDisabled={isItemDisabled}
            selectedItemId={selectedItemId}
            items={currentItems}
            onItemClick={this._onItemClick}
            onItemDoubleClick={this._onItemDoubleClick}
          />
        )}
      </Section>
    );
  }

  _renderFooter() {
    return (
      <Footer>
        <CancelButton onClick={this._onCloseButtonClick}>Cancel</CancelButton>
        <ChooseButton isDisabled={false} onClick={this._onChooseButtonClick}>
          Choose
        </ChooseButton>
      </Footer>
    );
  }

  render() {
    const { isModalOpen } = this.state;
    const { buttonText } = this.props;
    const elModal = document.getElementById(MODAL_CLASS);

    return (
      <Wrapper>
        <Modal
          container={elModal}
          show={isModalOpen}
          onCloseModal={this._onCloseButtonClick}
        >
          {this._renderHeader()}
          {this._renderItems()}
          {this._renderFooter()}
        </Modal>
        <DefaultButton onClick={this._getToken}>{buttonText}</DefaultButton>
      </Wrapper>
    );
  }
}

export default Picker;

const Wrapper = styled.div`
  font: 11px/34px Arial, Helvetica;
`;

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
  background: ${props => (props.isDisabled ? "#eaeaea" : "#20bed6")};
  color: ${props => (props.isDisabled ? "#999" : "#fff")};
  &:hover {
    cursor: ${props => (props.isDisabled ? "not-allowed" : "pointer")};
  }
  width: 50px;
`;
const CancelButton = DefaultButton.extend`
  background: #ffffff;
  border: 1px solid #e9e9e9;
  color: #999;
  width: 50px;
`;
