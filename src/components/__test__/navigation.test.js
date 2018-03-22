import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { Navigation } from "../../components";

describe("<Navigation />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Navigation />)).toMatchSnapshot();
    });
  });
});
