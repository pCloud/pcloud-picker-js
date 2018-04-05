// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();

type SelectItemOptions = {
  clientId: string,
  redirectUri: string,
  container: HTMLElement,
  isFileDisabled: boolean,
  onSelect: any => void,
  onClose: () => void
};

type UploadFileOptions = {
  clientId: string,
  redirectUri: string,
  container: HTMLElement,
  fileUrl: string,
  isFileDisabled: boolean,
  onSuccess: () => void,
  onSelect: any => void,
  onError: any => void,
  onClose: () => void
};

const PcloudPicker = {
  // get selected folder/file
  getSelectedItem(options: SelectItemOptions) {
    const {
      clientId,
      redirectUri,
      container,
      isFileDisabled,
      onSelect,
      onClose
    } = options;

    return ReactDOM.render(
      <App
        mode={"select"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Select pCloud"}
        isFileDisabled={isFileDisabled}
        onSelect={onSelect}
        onClose={onClose}
      />,
      container
    );
  },
  // upload file to pCloud folder
  uplodToFolder(options: UploadFileOptions) {
    const {
      clientId,
      redirectUri,
      container,
      fileUrl,
      onSuccess,
      onError,
      onClose
    } = options;

    return ReactDOM.render(
      <App
        mode={"upload"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Upload pCloud"}
        fileUrl={fileUrl}
        isFileDisabled={true}
        onSuccess={onSuccess}
        onError={onError}
        onClose={onClose}
      />,
      container
    );
  }
};

export default PcloudPicker;
