import * as React from "react";
import { shallow, mount } from "enzyme";
import "jest-styled-components";

import Picker from "../Picker";

describe("<Picker />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Picker />)).toMatchSnapshot();
    });
  });
});
