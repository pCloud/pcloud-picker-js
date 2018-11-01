import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { Item } from "../../components";

describe("<Item />", () => {
  const shallowItem = props => shallow(<Item {...props} />);
  let item, props;

  beforeEach(() => {
    props = {
      iconId: 20,
      id: "1931240732",
      isFolder: true,
      isFolderSelectionOnly: false,
      isSelected: false,
      name: "pCloud",
      onItemClick: jest.fn(),
      onItemDoubleClick: jest.fn()
    };
    item = shallowItem(props);
  });

  it("renders component correctly", () => {
    expect(item).toMatchSnapshot();
  });

  describe("<Row />", () => {
    let row;

    beforeEach(() => {
      row = item.find("Item__Row");
    });

    it("reders component", () => {
      expect(row.length).toBe(1);
    });

    it("renders <img /> and <ItemName />", () => {
      expect(row.children().length).toBe(2);
    });

    it("sets component props", () => {
      expect(row.prop("isSelectionDisabled")).toBeFalsy();
      expect(row.prop("isSelected")).toBeFalsy();
      expect(row.prop("onClick")).toEqual(item.instance().onClick);
      expect(row.prop("onDoubleClick")).toEqual(item.instance().onDoubleClick);
    });
  });

  describe("<img />", () => {
    let img;

    beforeEach(() => {
      img = item.find("Item__Row").childAt(0);
    });

    it("reders component", () => {
      expect(img.length).toBe(1);
    });

    it("render component props", () => {
      const getIconMock = jest.fn(() => require("./img/icons/24/20.png"));

      expect(img.prop("src")).toBe(getIconMock());
      expect(img.prop("alt")).toBe("icon");
    });
  });

  describe("<ItemName />", () => {
    let itemName;

    beforeEach(() => {
      itemName = item.find("Item__ItemName");
    });

    it("redenrs component", () => {
      expect(itemName.length).toBe(1);
    });
    it("renders item name correctly", () => {
      expect(itemName.children().text()).toBe("pCloud");
    });
  });

  describe("event handlers", () => {
    it("should call mock function when item is clicked", () => {
      item.simulate("click");
      expect(props.onItemClick).toHaveBeenCalled();
    });

    it("should call mock function when item is double clicked", () => {
      const onItemDoubleClick = jest.fn();
      const item = shallow(<Item onItemDoubleClick={onItemDoubleClick} />);
      item.simulate("doubleclick");
      expect(onItemDoubleClick).toHaveBeenCalled();
    });
  });
});
