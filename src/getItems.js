import pcloudSdk from 'pcloud-sdk-js';

export const getItems = client => client.listfolder(0).then(result => result.contents);