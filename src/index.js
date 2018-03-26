import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Picker } from "./components";
import registerServiceWorker from "./registerServiceWorker";
import { CLIENT_ID, REDIRECT_URI } from "./config/constants";

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

PcloudPicker.createPcloudButton({
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  container: document.getElementById("root"),
  onSelect: () => {},
  onClose: () => {}
});
