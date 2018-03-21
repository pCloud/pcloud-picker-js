import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Picker } from "./components";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();

const PcloudPicker = {
  createPcloudButton(options) {
    const { container, onSelect, onClose } = options;

    return ReactDOM.render(
      <Picker onSelect={onSelect} onClose={onClose} />,
      container
    );
  }
};

export default PcloudPicker;
PcloudPicker.createPcloudButton({
  container: document.getElementById("root"),
  onSelect: () => {},
  onClose: () => {}
});
