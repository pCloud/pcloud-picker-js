import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import { Picker, Modal } from "../../components";

describe("<Picker />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Picker />)).toMatchSnapshot();
    });
  });

  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);

  describe("<DefaultButton />", () => {
    it("should get user token and open modal", () => {
      const picker = mount(<Picker />);
      const defaultButton = picker.find("Picker__DefaultButton");
      expect(modalRoot.hasChildNodes()).toBeFalsy();
      defaultButton.simulate("click");
      expect(modalRoot.hasChildNodes()).toBeDefined();
    });
  });
});
