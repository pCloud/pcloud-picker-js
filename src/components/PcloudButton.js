import React, { Component } from 'react';
import pcloudSdk from 'pcloud-sdk-js';
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
      <div className="btn" onClick={this._onButtonClick}>pCloud</div>
    );
  }
}

export default PcloudButton;