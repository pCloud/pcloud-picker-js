import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import { App, Modal } from "..";

describe("<App />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<App />)).toMatchSnapshot();
    });
  });

  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);

  describe("<DefaultButton />", () => {
    it("should get user token and open modal", () => {
      const picker = mount(<App />);
      const defaultButton = picker.find("App__DefaultButton");
      expect(modalRoot.hasChildNodes()).toBeFalsy();
      defaultButton.simulate("click");
      expect(modalRoot.hasChildNodes()).toBeDefined();
    });
  });
});
