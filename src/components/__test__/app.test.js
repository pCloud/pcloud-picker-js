import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import { App, Modal } from "..";

const appProps = {
  mode: "select",
  clientId: "",
  buttonText: "PcloudButton",
  fileUrl: "",
  isFolderSelectionOnly: false,
  onSelect: () => {},
  onClose: () => {}
};

describe("<App />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<App />)).toMatchSnapshot();
    });
  });

  const modalRoot = global.document.createElement("div");
  const body = global.document.querySelector("body");
  modalRoot.setAttribute("id", "modal");
  body.appendChild(modalRoot);

  describe("<DefaultButton />", () => {
    it("should get user token and open modal", () => {
      const app = mount(<App {...appProps} />);
      const defaultButton = app.find("App__DefaultButton");
      app.debug();
      expect(modalRoot.hasChildNodes()).toBeFalsy();
      defaultButton.simulate("click");
      expect(modalRoot.hasChildNodes()).toBeDefined();
    });
  });
});
