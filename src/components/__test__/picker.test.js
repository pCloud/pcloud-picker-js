import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { Picker } from "../../components";

describe("<Picker />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Picker />)).toMatchSnapshot();
    });
  });
});
