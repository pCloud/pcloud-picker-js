import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";

import { pathMock, foldersMock } from "../../../__mocks__/picker";
import { Navigation } from "../../components";

describe("<Navigation />", () => {
  const shallowNavigation = props => shallow(<Navigation {...props} />);
  let navigation, props;

  beforeEach(() => {
    props = {
      path: pathMock,
      folders: foldersMock,
      onNameClick: jest.fn()
    };
    navigation = shallowNavigation(props);
  });

  it("should renders component correctly", () => {
    expect(navigation).toMatchSnapshot();
  });

  describe("<Path />", () => {
    let path;

    beforeEach(() => {
      path = navigation.find("Navigation__Path");
    });

    it("should render component", () => {
      expect(path.length).toBe(1);
    });

    it("should render component with one child", () => {
      expect(path.children().length).toBe(1);
    });
  });

  describe("<NavigationPath />", () => {
    let navigationFolder;

    beforeEach(() => {
      navigationFolder = navigation.find("NavigationFolder");
    });

    it("should render component", () => {
      expect(navigationFolder.length).toBe(1);
    });

    it("should set component props", () => {
      expect(navigationFolder.prop("id")).toBe("0");
      expect(navigationFolder.prop("name")).toBe("pCloud");
      expect(navigationFolder.prop("shouldRenderIcon")).toBeFalsy();
      expect(navigationFolder.prop("onNameClick")).toEqual(
        navigation.instance().props.onNameClick
      );
    });
  });
});
