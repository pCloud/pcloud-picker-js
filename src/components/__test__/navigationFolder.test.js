import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { NavigationFolder } from "../../components";

describe("<NavigationFolder />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<NavigationFolder />)).toMatchSnapshot();
    });
  });
});
