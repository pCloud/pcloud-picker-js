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

  let app;

  describe("<DefaultButton />", () => {
    beforeEach(() => {
      app = mount(<App {...appProps} />);
    });

    afterEach(() => {
      app.unmount();
    });

    it("renders correct button text", () => {
      expect(app.props().buttonText).toBe("PcloudButton");
    });

    it("should get user token and open modal", () => {
      const defaultButton = app.find("App__DefaultButton");

      expect(app.state("isAuthenticated")).toBeFalsy();
      expect(app.state("isModalOpened")).toBeFalsy();

      defaultButton.simulate("click");

      expect(app.state("isAuthenticated")).toBeTruthy();
      expect(app.state("isModalOpened")).toBeTruthy();
    });
  });
});
