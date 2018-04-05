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
  isFolderSelectionOnly: boolean,
  onSelect: any => void,
  onClose: () => void
};

type UploadFileOptions = {
  clientId: string,
  redirectUri: string,
  container: HTMLElement,
  fileUrl: string,
  isFolderSelectionOnly: boolean,
  onClose: () => void
};

const PcloudPicker = {
  // get selected folder/file
  getSelectedItem(options: SelectItemOptions) {
    const {
      clientId,
      redirectUri,
      container,
      isFolderSelectionOnly,
      onSelect,
      onClose
    } = options;

    return ReactDOM.render(
      <App
        mode={"select"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Select pCloud"}
        isFolderSelectionOnly={isFolderSelectionOnly}
        onSelect={onSelect}
        onClose={onClose}
      />,
      container
    );
  },
  // upload file to pCloud folder
  uplodToFolder(options: UploadFileOptions) {
    const { clientId, redirectUri, container, fileUrl, onClose } = options;

    return ReactDOM.render(
      <App
        mode={"upload"}
        clientId={clientId}
        redirectUri={redirectUri}
        buttonText={"Upload pCloud"}
        fileUrl={fileUrl}
        isFolderSelectionOnly={true}
        onClose={onClose}
      />,
      container
    );
  }
};

export default PcloudPicker;
