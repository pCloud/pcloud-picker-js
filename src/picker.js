// @flow

import * as React from "react";
import ReactDOM from "react-dom";
import { App } from "./components";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();

type SelectItemOptions = {
  clientId: string,
  container: HTMLElement,
  isFolderSelectionOnly: boolean,
  onSelect: any => void,
  onClose: () => void
};

type UploadFileOptions = {
  clientId: string,
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
      container,
      isFolderSelectionOnly,
      onSelect,
      onClose
    } = options;

    return ReactDOM.render(
      <App
        mode={"select"}
        clientId={clientId}
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
    const { clientId, container, fileUrl, onClose } = options;

    return ReactDOM.render(
      <App
        mode={"upload"}
        clientId={clientId}
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
