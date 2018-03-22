import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { Item } from "../../components";
import { Row, ItemName } from "../../components/Item";

describe("<Item />", () => {
  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallow(<Item />)).toMatchSnapshot();
    });

    it("renders an item name", () => {
      const item = shallow(<Item name="pCloud" />);
      const itemName = item.find(ItemName).children();
      expect(itemName.text()).toBe("pCloud");
    });
  });

  describe("event hadlers", () => {
    it("should call mock function when item is clicked", () => {
      const onItemClick = jest.fn();
      const item = shallow(<Item onItemClick={onItemClick} />);
      item.simulate("click");
      expect(onItemClick).toHaveBeenCalled();
    });

    it("should call mock function when item is double clicked", () => {
      const onItemDoubleClick = jest.fn();
      const item = shallow(<Item onItemDoubleClick={onItemDoubleClick} />);
      item.simulate("doubleclick");
      expect(onItemDoubleClick).toHaveBeenCalled();
    });
  });
});
