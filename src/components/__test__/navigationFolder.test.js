import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { NavigationFolder } from "../../components";
import ArrowIcon from "../../img/arrow.png";

describe("<NavigationFolder />", () => {
  const shallowNavigationFolder = props => {
    return shallow(<NavigationFolder {...props} />);
  };
  let navigationFolder, props;

  beforeEach(() => {
    props = {
      id: "0",
      name: "pCloud",
      onNameClick: jest.fn(),
      shouldRenderIcon: false
    };
    navigationFolder = shallowNavigationFolder(props);
  });

  it("renders component correctly", () => {
    expect(navigationFolder).toMatchSnapshot();
  });

  describe("<Wrapper />", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = navigationFolder.find("NavigationFolder__Wrapper");
    });

    it("renders component correctly", () => {
      expect(wrapper.length).toBeGreaterThan(0);
    });

    it("contains everything else that gets rendered", () => {
      const wrapperDiv = wrapper.first();
      expect(wrapper.children()).toEqual(navigationFolder.children());
    });
  });

  describe("Arrow icon", () => {
    let icon, props;

    beforeEach(() => {
      props = {
        id: "0",
        name: "pCloud",
        onNameClick: jest.fn(),
        shouldRenderIcon: true
      };
      icon = shallowNavigationFolder(props).find("img");
    });

    it("should render arrow icon", () => {
      expect(icon.length).toBe(1);
    });

    it("sets icon props", () => {
      expect(icon.prop("src")).toEqual(ArrowIcon);
    });
  });
  describe("Arrow icon", () => {
    let folderName;

    beforeEach(() => {
      folderName = navigationFolder.find("NavigationFolder__FolderName");
    });

    it("should redner component", () => {
      expect(folderName.length).toBe(1);
    });

    it("should set component props", () => {
      expect(folderName.prop("onClick")).toEqual(
        navigationFolder.instance().onClick
      );
    });

    it("should redner text", () => {
      expect(folderName.children().text()).toBe("pCloud");
    });
  });
});
