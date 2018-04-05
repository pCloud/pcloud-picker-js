// @flow

import * as React from "react";
import pcloudSdk from "pcloud-sdk-js";
import styled from "styled-components";
import { Picker, Modal } from ".";
import type { selectedItemType } from "../utils";
import { MODE_SELECT, MODE_UPLOAD } from "../config/constants";

const MODAL_CLASS = "pcloud-modal";
const MODAL_EL = document.createElement("div");
MODAL_EL.setAttribute("id", MODAL_CLASS);
const BODY = global.document.querySelector("body");

type AppProps = {
  mode: MODE_SELECT | MODE_UPLOAD,
  clientId: string,
  redirectUri: string,
  buttonText: string,
  fileUrl: string,
  isFileDisabled: boolean,
  onSelect: any => void,
  onClose: any => void,
  onSuccess: any => void,
  onError: any => void
};

type AppState = {
  isAuthenticated: boolean,
  isModalOpenned: boolean
};

class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    mode: "",
    clientId: "",
    redirectUri: "",
    buttonText: "PcloudButton",
    fileUrl: "",
    isFileDisabled: false,
    onSelect: () => {},
    onClose: () => {},
    onSuccess: () => {},
    onError: () => {}
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isModalOpenned: false
    };

    (this: any)._client = null;
    (this: any)._receiveToken = this._receiveToken.bind(this);
    (this: any)._getToken = this._getToken.bind(this);
    (this: any)._onModalClose = this._onModalClose.bind(this);
    (this: any)._onPick = this._onPick.bind(this);
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

    this.setState({ isModalOpenned: true });
  }

  _receiveToken(token: string) {
    (this: any)._client = this._getClient(token);

    this.setState({ isAuthenticated: true, isModalOpenned: true });
  }

  _getClient(token: string) {
    // handle errors
    return pcloudSdk.createClient(token);
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

    this.setState({ isModalOpenned: false });

    if (mode === MODE_SELECT) {
      onSelect(selectedItem);
    }

    if (mode === MODE_UPLOAD) {
      this._uploadFile(id);
    }
  }

  _onModalClose() {
    this.setState({ isModalOpenned: false });
  }

  componentWillMount() {
    BODY.appendChild(MODAL_EL);
  }

  componentWillUnmount() {
    BODY.removeChild(MODAL_EL);
  }

  render() {
    const { isAuthenticated, isModalOpenned } = this.state;
    const { mode, buttonText, isFileDisabled } = this.props;
    const { onClose, onSuccess, onError } = this.props;

    return (
      <Wrapper>
        <Modal
          container={MODAL_EL}
          show={isModalOpenned}
          onModalClose={this._onModalClose}
        >
          {isAuthenticated ? (
            <Picker
              mode={mode}
              client={(this: any)._client}
              isFileDisabled={isFileDisabled}
              onPick={this._onPick}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
              onModalClose={this._onModalClose}
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
