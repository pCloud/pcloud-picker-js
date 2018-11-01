import * as React from "react";
import { shallow, mount } from "enzyme";
import { List, Map, is } from "immutable";
import "jest-styled-components";

import Picker from "../Picker";
import { ROOT_FOLDER_ID, ROOT_FOLDER_NAME } from "../../config/constants";
import {
  pathMock,
  foldersMock,
  getFolderContentMock
} from "../../../__mocks__/picker";

console.log({ pathMock, foldersMock });
describe("<Picker />", () => {
  let picker, pickerInstance;
  const props = {
    getFolderContent: getFolderContentMock,
    isFolderSelectionOnly: false,
    onPick: jest.fn(),
    onCancel: jest.fn()
  };

  beforeEach(async () => {
    picker = await shallow(<Picker {...props} />);
    picker.update();
    pickerInstance = picker.instance();
  });

  describe("render <Picker />", () => {
    it("renders component correctly", () => {
      expect(picker).toMatchSnapshot();
    });

    it("sets component props correctly", () => {
      expect(pickerInstance.props.isFolderSelectionOnly).toEqual(false);
      expect(pickerInstance.props.getFolderContent).toEqual(
        getFolderContentMock
      );
      expect(pickerInstance.props.onPick).toBeDefined();
      expect(pickerInstance.props.onCancel).toBeDefined();
    });

    describe("componentDidMount", () => {
      it("calls componentDidMount", () => {
        pickerInstance.componentDidMount();
        expect(getFolderContentMock).toBeCalled();
      });

      it("should fetch, and put folders in state if ok", () => {
        const foldersProp = picker.state("folders");

        // expect(is(foldersProp, foldersMock)).toBeTruthy();
        expect(foldersProp).toEqual(foldersMock);
      });
    });

    describe("<Header />", () => {
      let header;

      beforeEach(() => {
        header = picker.find("Picker__Header");
      });

      it("renders component correctly", () => {
        expect(header).toBeDefined();
      });

      it("sets component porps correctly", () => {
        const navigation = header.children();

        expect(is(navigation.prop("path"), pathMock)).toBeTruthy();
        expect(navigation.prop("folders")).toEqual(foldersMock);
        // expect(is(navigation.prop("folders"), foldersMock)).toBeTruthy();
      });
    });

    describe("<Loader />", () => {
      let picker, loader;

      beforeEach(() => {
        picker = shallow(
          <Picker getFolderContent={jest.fn(() => Promise.resolve(null))} />
        );
        loader = picker.find("Picker__Loader");
      });

      it("renders component correctly", () => {
        expect(loader).toBeDefined();
      });

      it("does not receive any props", () => {
        expect(Object.keys(loader.props()).length).toBe(0);
      });
    });

    describe("<ItemsList />", () => {
      let section, itemsList;

      beforeEach(() => {
        section = picker.find("Picker__Section");
        itemsList = section.children();
      });

      it("should render component correctly", () => {
        expect(itemsList).toBeDefined();
      });

      it("sets component props correctly", () => {
        const selectedItemIdMock = ROOT_FOLDER_ID;
        const currentFolderIdMock = ROOT_FOLDER_ID;
        const itemsMock = foldersMock.getIn(
          [currentFolderIdMock, "items"],
          null
        );
        const isFolderSelectionOnlyMock =
          pickerInstance.props.isFolderSelectionOnly;
        const onItemClickMock = pickerInstance.onItemClick;
        const onItemDoubleClickMock = pickerInstance.onItemDoubleClick;

        expect(itemsList.prop("selectedItemId")).toEqual(selectedItemIdMock);
        expect(itemsList.prop("items")).toEqual(itemsMock);
        expect(itemsList.prop("isFolderSelectionOnly")).toEqual(
          isFolderSelectionOnlyMock
        );
        expect(itemsList.prop("onItemClick")).toEqual(onItemClickMock);
        expect(itemsList.prop("onItemDoubleClick")).toEqual(
          onItemDoubleClickMock
        );
      });
    });

    describe("<Footer />", () => {
      let footer;
      beforeEach(() => {
        footer = picker.find("Picker__Footer");
      });

      it("renders component correctly", () => {
        expect(footer).toBeDefined();
      });

      it("renders <CancelButton /> and <ChooseButton />", () => {
        expect(footer.children().length).toBe(2);
      });

      it("should handle click events", () => {
        const cancelButton = footer.childAt(0);
        const chooseButton = footer.childAt(1);

        cancelButton.simulate("click");
        expect(pickerInstance.props.onCancel).toBeCalled;

        chooseButton.simulate("click");
        expect(pickerInstance.props.onPick).toBeCalled;
      });
    });
  });
});
