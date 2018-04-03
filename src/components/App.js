// @flow

import * as React from "react";
import pcloudSdk from "pcloud-sdk-js";
import styled from "styled-components";
import { Picker, Modal } from ".";
import type { selectedItemType } from "../utils";

const MODAL_CLASS = "pcloud-modal";
const BODY = global.document.querySelector("body");

type AppProps = {
  mode: string,
  clientId: string,
  redirectUri: string,
  buttonText: string,
  fileUrl: string,
  onSelect: any => void,
  onClose: () => void,
  onSuccess: () => void,
  onError: any => void
};

type AppState = {
  isAuthenticated: boolean,
  isModalOpen: boolean
};

class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    mode: "",
    clientId: "",
    redirectUri: "",
    buttonText: "PcloudButton",
    fileUrl: "",
    onSelect: () => {},
    onClose: () => {},
    onSuccess: () => {},
    onError: () => {}
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isModalOpen: false
    };

    (this: any)._client = null;
    (this: any)._receiveToken = this._receiveToken.bind(this);
    (this: any)._getToken = this._getToken.bind(this);
    (this: any)._onCloseModal = this._onCloseModal.bind(this);
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

    this.setState({ isModalOpen: true });
  }

  _receiveToken(token: string) {
    (this: any)._client = this._getClient(token);

    this.setState({ isAuthenticated: true, isModalOpen: true });
  }

  _getClient(token: string) {
    // handle errors
    return pcloudSdk.createClient(token);
  }

  _onCloseModal() {
    this.setState({ isModalOpen: false });
  }

  _onPick(selectedItem: selectedItemType) {
    this.setState({ isModalOpen: false });
  }

  componentWillMount() {
    const modal = document.createElement("div");
    modal.setAttribute("id", MODAL_CLASS);
    BODY.appendChild(modal);
  }

  componentWillUnmount() {
    const elModal = document.getElementById(MODAL_CLASS);
    BODY.removeChild(elModal);
  }

  render() {
    const { isAuthenticated, isModalOpen } = this.state;
    const { mode, buttonText, fileUrl } = this.props;
    const { onSelect, onClose, onSuccess, onError } = this.props;
    const elModal = document.getElementById(MODAL_CLASS);

    return (
      <Wrapper>
        <Modal
          container={elModal}
          show={isModalOpen}
          onCloseModal={this._onCloseModal}
        >
          {isAuthenticated ? (
            <Picker
              mode={mode}
              fileUrl={fileUrl}
              client={(this: any)._client}
              onPick={this._onPick}
              onSelect={onSelect}
              onClose={onClose}
              onSuccess={onSuccess}
              onError={onError}
              onModalClose={this._onCloseModal}
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
