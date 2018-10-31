import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import { App, Modal } from "..";

const appProps = {
  mode: "select",
  clientId: "lh4j5JDeeCB",
  buttonText: "PcloudButton",
  fileUrl: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
  isFolderSelectionOnly: false,
  onSelect: jest.fn(),
  onClose: jest.fn()
};

describe("<App />", () => {
  let app, appInstance;

  beforeEach(() => {
    app = shallow(<App {...appProps} />);
    appInstance = app.instance();
  });

  it("renders component correctly", () => {
    expect(app).toMatchSnapshot();
  });

  describe("<Wrapper />", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = app.find("App__Wrapper");
    });

    it("renders component correctly", () => {
      expect(wrapper.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
      const wrapperDiv = wrapper.first();
      expect(wrapper.children()).toEqual(app.children());
    });
  });

  describe("<Modal />", () => {
    let modal;

    beforeEach(() => {
      modal = app.find("Modal");
    });

    it("redners component correctly", () => {
      expect(modal.length).toBe(1);
    });

    it("sets component props porps", () => {
      expect(modal.prop("show")).toEqual(app.state("isModalOpened"));
      expect(modal.prop("closeModal")).toEqual(appInstance.closeModal);
    });
  });

  describe("<Picker />", () => {
    let picker;
    beforeEach(() => {
      app.setState({ isAuthenticated: true });
      picker = app.find("Picker");
    });

    it("redners component correctly when isAuthenticated is set", () => {
      expect(app.find("Picker").length).toBe(1);
    });

    it("set component props correctly", () => {
      expect(picker.prop("isFolderSelectionOnly")).toEqual(
        appInstance.props.isFolderSelectionOnly
      );
      expect(picker.prop("getFolderContent")).toEqual(
        appInstance.getFolderContent
      );
      expect(picker.prop("onPick")).toEqual(appInstance.onPick);
      expect(picker.prop("onCancel")).toEqual(appInstance.onCancel);
    });
  });

  describe("<DefaultButton />", () => {
    let defaultButton;

    beforeEach(() => {
      defaultButton = app.find("App__DefaultButton");
    });

    it("should render component correctly", () => {
      expect(defaultButton.length).toBe(1);
    });

    it("sets component props correctly", () => {
      expect(defaultButton.prop("onClick")).toEqual(appInstance.getToken);
    });

    it("renders button text correctly", () => {
      expect(defaultButton.children().text()).toBe(
        appInstance.props.buttonText
      );
    });

    it("should get user token and open modal", () => {
      expect(app.state("isAuthenticated")).toBeFalsy();
      expect(app.state("isModalOpened")).toBeFalsy();

      defaultButton.simulate("click");

      expect(app.state("isAuthenticated")).toBeTruthy();
      expect(app.state("isModalOpened")).toBeTruthy();
    });
  });
});
