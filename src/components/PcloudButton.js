import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
import styled from "styled-components";
import { CLIENT_ID, REDIRECT_URI } from '../config/constants';

class PcloudButton extends Component {
  constructor() {
    super();

    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _getToken(receiveToken) {

    pcloudSdk.oauth.initOauthToken({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      receiveToken: receiveToken
    });
  }

  _onButtonClick() {
    const { receiveToken } = this.props;

    this._getToken(receiveToken);
  }

  render() {
    return (
      <Button onClick={this._onButtonClick}>pCloud</Button>
    );
  }
}

export default PcloudButton;

const Button = styled.div`
  cursor: pointer;
  margin-top: 9px;
  height: 28px;
  width: 50px;
  text-align: center;
  line-height: 28px;
  background: #17bed0;
  color: #fff;
  font-size: 14px;
  padding: 0 20px;
  border-radius: 3px;
`;