// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { Picker } from "./components";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();

type SelectItemOptions = {
  clientId: string,
  redirectUri: string,
  container: HTMLElement,
  disableFileSelection: boolean,
  onSelect: any => void,
  onClose: () => void
};

type UploadFileOptions = {
  clientId: string,
  redirectUri: string,
  container: HTMLElement,
  fileUrl: string,
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
      disableFileSelection,
      onSelect,
      onClose
    } = options;

    return ReactDOM.render(
      <Picker
        mode={"select"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Select pCloud"}
        disableFileSelection={disableFileSelection}
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
      <Picker
        mode={"upload"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Upload pCloud"}
        fileUrl={fileUrl}
        onSuccess={onSuccess}
        onError={onError}
        onClose={onClose}
      />,
      container
    );
  }
};

export default PcloudPicker;
