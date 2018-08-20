// @flow

import * as React from "react";
import pcloudSdk from "pcloud-sdk-js";
import styled from "styled-components";
import { Picker, Modal } from ".";
import { parseItem } from "../utils";
import type { selectedItemType } from "../utils";
import { MODE_SELECT, MODE_UPLOAD } from "../config/constants";

type AppProps = {
  mode: MODE_SELECT | MODE_UPLOAD,
  clientId: string,
  buttonText: string,
  fileUrl: string,
  isFolderSelectionOnly: boolean,
  onSelect: any => void,
  onClose: any => void
};

type AppState = {
  isAuthenticated: boolean,
  isModalOpened: boolean
};

class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    mode: "",
    clientId: "",
    buttonText: "PcloudButton",
    fileUrl: "",
    isFolderSelectionOnly: false,
    onSelect: () => {},
    onClose: () => {}
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isModalOpened: false
    };

    (this: any).client = null;
    (this: any).receiveToken = this.receiveToken.bind(this);
    (this: any).getToken = this.getToken.bind(this);
    (this: any).getFolderContent = this.getFolderContent.bind(this);
    (this: any).onPick = this.onPick.bind(this);
    (this: any).onCancel = this.onCancel.bind(this);
  }

  openModal() {
    this.setState({ isModalOpened: true });
  }

  closeModal() {
    this.setState({ isModalOpened: false });
  }

  getClient(token: string) {
    // handle errors
    return pcloudSdk.createClient(token);
  }

  receiveToken(token: string) {
    this.client = this.getClient(token);

    this.setState({ isAuthenticated: true, isModalOpened: true });
  }

  getToken() {
    const { clientId } = this.props;
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      pcloudSdk.oauth.initOauthToken({
        client_id: clientId,
        receiveToken: this.receiveToken
      });
    }

    this.openModal();
  }

  getFolderContent(folderId: number) {
    return this.client
      .listfolder(folderId, { iconformat: "id" })
      .then(res => res.contents)
      .then(items => items.map(parseItem))
      .catch(err => {
        console.log(err);
      });
  }

  uploadFile(selectedItemId: string) {
    const { fileUrl } = this.props;

    this.client
      .remoteupload(fileUrl, selectedItemId)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  onPick(selectedItem: selectedItemType) {
    const { mode, onSelect } = this.props;
    const { id } = selectedItem;

    this.closeModal();

    switch (mode) {
      case MODE_SELECT:
        return onSelect(selectedItem);

      case MODE_UPLOAD:
        return this.uploadFile(id);

      default:
        return null;
    }
  }

  onCancel() {
    const { onClose } = this.props;

    onClose();
    this.closeModal();
  }

  render() {
    const { isAuthenticated, isModalOpened } = this.state;
    const { buttonText, isFolderSelectionOnly } = this.props;

    return (
      <Wrapper>
        <Modal show={isModalOpened} closeModal={this.closeModal}>
          {isAuthenticated ? (
            <Picker
              isFolderSelectionOnly={isFolderSelectionOnly}
              getFolderContent={this.getFolderContent}
              onPick={this.onPick}
              onCancel={this.onCancel}
            />
          ) : null}
        </Modal>
        <DefaultButton onClick={this.getToken}>{buttonText}</DefaultButton>
      </Wrapper>
    );
  }
}

export default App;

const Wrapper = styled.div`
  font: 11px/34px Arial, Helvetica;
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
