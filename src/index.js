import React from "react";
import ReactDOM from "react-dom";
import { Picker } from "./components";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();

const PcloudPicker = {
  createPcloudButton(options) {
    const { clientId, redirectUri, container, onSelect, onClose } = options;

    return ReactDOM.render(
      <Picker
        clientId={clientId}
        redirectUri={redirectUri}
        onSelect={onSelect}
        onClose={onClose}
      />,
      container
    );
  }
};

export default PcloudPicker;
