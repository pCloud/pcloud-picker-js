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
  redirectUri: string,
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
    redirectUri: "",
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

    (this: any)._client = null;
    (this: any)._receiveToken = this._receiveToken.bind(this);
    (this: any)._getToken = this._getToken.bind(this);
    (this: any)._getFolderContent = this._getFolderContent.bind(this);
    (this: any)._onPick = this._onPick.bind(this);
    (this: any)._onCancel = this._onCancel.bind(this);
  }

  _openModal() {
    this.setState({ isModalOpened: true });
  }

  _closeModal() {
    this.setState({ isModalOpened: false });
  }

  _getClient(token: string) {
    // handle errors
    return pcloudSdk.createClient(token);
  }

  _receiveToken(token: string) {
    (this: any)._client = this._getClient(token);

    this.setState({ isAuthenticated: true, isModalOpened: true });
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

    this._openModal();
  }

  _getFolderContent(folderId: number) {
    return (this: any)._client
      .listfolder(folderId, { iconformat: "id" })
      .then(res => res.contents)
      .then(items => items.map(parseItem))
      .catch(err => {
        console.log(err);
      });
  }

  _uploadFile(selectedItemId: string) {
    const { fileUrl } = this.props;

    (this: any)._client
      .remoteupload(fileUrl, selectedItemId)
      .then(data => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }

  _onPick(selectedItem: selectedItemType) {
    const { mode, onSelect } = this.props;
    const { id } = selectedItem;

    this._closeModal();

    switch (mode) {
      case MODE_SELECT:
        return onSelect(selectedItem);

      case MODE_UPLOAD:
        return this._uploadFile(id);

      default:
        return null;
    }
  }

  _onCancel() {
    const { onClose } = this.props;

    onClose();
    this._closeModal();
  }

  render() {
    const { isAuthenticated, isModalOpened } = this.state;
    const { buttonText, isFolderSelectionOnly } = this.props;

    return (
      <Wrapper>
        <Modal show={isModalOpened} closeModal={this._closeModal}>
          {isAuthenticated ? (
            <Picker
              isFolderSelectionOnly={isFolderSelectionOnly}
              getFolderContent={this._getFolderContent}
              onPick={this._onPick}
              onCancel={this._onCancel}
            />
          ) : null}
        </Modal>
        <DefaultButton onClick={this._getToken}>{buttonText}</DefaultButton>
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
