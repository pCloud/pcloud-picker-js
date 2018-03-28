import * as React from "react";
import { shallow, mount } from "enzyme";

import { Modal } from "../index";

describe("<Modal />", () => {
  describe("render", () => {
    const modalRoot = global.document.createElement("div");
    modalRoot.setAttribute("id", "modal");
    const body = global.document.querySelector("body");
    body.appendChild(modalRoot);

    it("should renders component correctly", () => {
      expect(
        mount(<Modal container={modalRoot} show={true} />)
      ).toMatchSnapshot();
    });
  });
});
