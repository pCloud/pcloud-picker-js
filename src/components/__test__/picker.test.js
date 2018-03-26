import * as React from "react";
import { shallow, mount, render } from "enzyme";
import renderer from "react-test-renderer";
import "jest-styled-components";

import { Picker } from "../../components";

describe("<Picker />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Picker />)).toMatchSnapshot();
    });
  });

  describe("<DefaultButton />", () => {
    it("should get user token", () => {
      const picker = mount(<Picker />);
      // console.log(picker.debug());
      // const defaultButton = picker.find("Picker__DefaultButton");
      // expect(defaultButton).toBeDefined();
      // defaultButton.simulate("click");
      // expect(defaultButton).not.toBeDefined();
      // expect(picker.find("Picker__PickerWrapper")).toBeDefined();
    });
  });
});
