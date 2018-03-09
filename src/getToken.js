import pcloudSdk from 'pcloud-sdk-js';
import { CLIENT_ID, REDIRECT_URI } from './config/constants'



export const getToken = receiveToken => {
  pcloudSdk.oauth.initOauthToken({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    receiveToken: receiveToken
  })

}

export const getClient = token => pcloudSdk.createClient(token);