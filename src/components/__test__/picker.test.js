import * as React from "react";
import { shallow, mount } from "enzyme";
import { List, Map, is } from "immutable";
import "jest-styled-components";

import Picker from "../Picker";
import { ROOT_FOLDER_ID, ROOT_FOLDER_NAME } from "../../config/constants";

const items = [
  {
    path: "/Account shares",
    name: "Account shares",
    created: "Wed, 25 Apr 2018 13:19:23 +0000",
    ismine: true,
    thumb: false,
    modified: "Mon, 03 Sep 2018 10:31:41 +0000",
    comments: 0,
    id: "d1691924914",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1691924914
  },
  {
    path: "/Applications",
    name: "Applications",
    created: "Wed, 07 Mar 2018 08:37:56 +0000",
    ismine: true,
    thumb: false,
    modified: "Thu, 02 Aug 2018 07:44:04 +0000",
    comments: 0,
    id: "d1538637315",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1538637315
  },
  {
    path: "/My Music",
    name: "My Music",
    created: "Wed, 07 Mar 2018 07:02:48 +0000",
    ismine: true,
    thumb: false,
    modified: "Thu, 02 Aug 2018 07:44:16 +0000",
    comments: 0,
    id: "d1538452028",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1538452028
  },
  {
    path: "/My Pictures",
    name: "My Pictures",
    created: "Wed, 07 Mar 2018 07:02:48 +0000",
    ismine: true,
    thumb: false,
    modified: "Wed, 07 Mar 2018 07:02:48 +0000",
    comments: 0,
    id: "d1538452030",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1538452030
  },
  {
    path: "/My Videos",
    name: "My Videos",
    created: "Wed, 07 Mar 2018 07:02:48 +0000",
    ismine: true,
    thumb: false,
    modified: "Wed, 07 Mar 2018 07:02:48 +0000",
    comments: 0,
    id: "d1538452031",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1538452031
  },
  {
    path: "/name",
    name: "name",
    created: "Wed, 07 Mar 2018 12:02:23 +0000",
    ismine: true,
    thumb: false,
    modified: "Wed, 14 Mar 2018 07:13:36 +0000",
    comments: 0,
    id: "d1539022774",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1539022774
  },
  {
    path: "/pCloud Help",
    name: "pCloud Help",
    created: "Wed, 07 Mar 2018 07:02:48 +0000",
    ismine: true,
    thumb: false,
    modified: "Wed, 07 Mar 2018 07:02:48 +0000",
    comments: 0,
    id: "d1538452032",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1538452032
  },
  {
    path: "/pCloud Sync",
    name: "pCloud Sync",
    created: "Thu, 12 Apr 2018 10:42:55 +0000",
    ismine: true,
    thumb: false,
    modified: "Thu, 12 Apr 2018 10:42:55 +0000",
    comments: 0,
    id: "d1645496507",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1645496507
  },
  {
    path: "/pCloud Save",
    name: "pCloud Save",
    created: "Tue, 07 Aug 2018 12:29:19 +0000",
    ismine: true,
    thumb: false,
    modified: "Tue, 07 Aug 2018 12:30:52 +0000",
    comments: 0,
    id: "d2026508651",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 2026508651
  },
  {
    path: "/Public Folder",
    name: "Public Folder",
    created: "Thu, 20 Sep 2018 07:43:38 +0000",
    ismine: true,
    ispublic: true,
    thumb: false,
    modified: "Thu, 20 Sep 2018 07:43:38 +0000",
    ispublicroot: true,
    comments: 0,
    id: "d2209611841",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 2209611841
  },
  {
    path: '/Saved "name" from link on Mar 7, 2018',
    name: 'Saved "name" from link on Mar 7, 2018',
    created: "Wed, 07 Mar 2018 12:00:44 +0000",
    ismine: true,
    thumb: false,
    modified: "Wed, 07 Mar 2018 12:00:44 +0000",
    comments: 0,
    id: "d1539020460",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1539020460
  },
  {
    path: '/Saved "name" from link on Mar 7, 2018 (1)',
    name: 'Saved "name" from link on Mar 7, 2018 (1)',
    created: "Wed, 07 Mar 2018 12:03:08 +0000",
    ismine: true,
    thumb: false,
    modified: "Fri, 16 Mar 2018 13:25:52 +0000",
    comments: 0,
    id: "d1539023959",
    isshared: false,
    icon: 20,
    isfolder: true,
    parentfolderid: 0,
    folderid: 1539023959
  },
  {
    name: "ChangePhoneNumberStep.png",
    created: "Fri, 15 Jun 2018 12:29:42 +0000",
    thumb: true,
    modified: "Fri, 15 Jun 2018 12:29:42 +0000",
    isfolder: false,
    height: 748,
    fileid: 7302469511,
    width: 960,
    hash: 9582694307891362674,
    comments: 0,
    path: "/ChangePhoneNumberStep.png",
    category: 1,
    id: "f7302469511",
    isshared: false,
    ismine: true,
    size: 60607,
    parentfolderid: 0,
    contenttype: "image/png",
    icon: 1
  },
  {
    name: "File-pcker-Design-notes.png",
    created: "Tue, 20 Mar 2018 07:50:24 +0000",
    thumb: true,
    modified: "Tue, 20 Mar 2018 07:50:24 +0000",
    isfolder: false,
    height: 768,
    fileid: 7302476302,
    width: 1471,
    hash: 4536844674839521657,
    comments: 0,
    path: "/File-pcker-Design-notes.png",
    category: 1,
    id: "f7302476302",
    isshared: false,
    ismine: true,
    size: 41359,
    parentfolderid: 0,
    contenttype: "image/png",
    icon: 1
  },
  {
    name: "Funny-Cat-Jokes2.jpg",
    created: "Fri, 30 Mar 2018 12:10:22 +0000",
    thumb: true,
    modified: "Fri, 13 Apr 2018 07:39:19 +0000",
    isfolder: false,
    height: 576,
    fileid: 5969899273,
    width: 1021,
    hash: 5746975363345008565,
    comments: 0,
    path: "/Funny-Cat-Jokes2.jpg",
    category: 1,
    id: "f5969899273",
    isshared: false,
    ismine: true,
    size: 87328,
    parentfolderid: 0,
    contenttype: "image/jpeg",
    icon: 1
  },
  {
    name: "GPS Tracker 01.png",
    created: "Thu, 02 Aug 2018 07:07:23 +0000",
    thumb: true,
    modified: "Thu, 02 Aug 2018 07:07:23 +0000",
    isfolder: false,
    height: 609,
    fileid: 7528705119,
    width: 1000,
    hash: 16151197419269378216,
    comments: 0,
    path: "/GPS Tracker 01.png",
    category: 1,
    id: "f7528705119",
    isshared: false,
    ismine: true,
    size: 375060,
    parentfolderid: 0,
    contenttype: "image/png",
    icon: 1
  },
  {
    name: "VSCodeSetup-x64-1.20.1.exe",
    created: "Wed, 07 Mar 2018 07:45:40 +0000",
    thumb: false,
    modified: "Wed, 07 Mar 2018 07:45:40 +0000",
    isfolder: false,
    fileid: 5682103824,
    hash: 6209240444731004342,
    comments: 0,
    path: "/VSCodeSetup-x64-1.20.1.exe",
    category: 0,
    id: "f5682103824",
    isshared: false,
    ismine: true,
    size: 44321336,
    parentfolderid: 0,
    contenttype: "application/x-msdos-program",
    icon: 16
  },
  {
    name: "wallpaper.jpg",
    created: "Wed, 14 Mar 2018 13:43:17 +0000",
    thumb: true,
    modified: "Wed, 14 Mar 2018 13:43:17 +0000",
    isfolder: false,
    height: 1200,
    fileid: 5776162161,
    width: 1920,
    hash: 18203789150339088526,
    comments: 0,
    path: "/wallpaper.jpg",
    category: 1,
    id: "f5776162161",
    isshared: false,
    ismine: true,
    size: 941162,
    parentfolderid: 0,
    contenttype: "image/jpeg",
    icon: 1
  }
];
const mockPath = List([ROOT_FOLDER_ID]);
const mockFolders = Map({
  [ROOT_FOLDER_ID]: {
    folderName: ROOT_FOLDER_NAME,
    items: List(items)
  }
});
const getFolderContentMock = jest.fn(() => Promise.resolve(items));

describe("<Picker />", () => {
  let picker;
  const props = {
    getFolderContent: getFolderContentMock,
    isFolderSelectionOnly: false,
    onPick: jest.fn(),
    onCancel: jest.fn()
  };

  beforeEach(async () => {
    picker = await shallow(<Picker {...props} />);
    picker.update();
  });

  describe("render", () => {
    it("renders <Picker /> correctly", () => {
      expect(picker).toMatchSnapshot();
    });

    it("sets <Picker /> props correctly", () => {
      expect(picker.instance().props.isFolderSelectionOnly).toEqual(false);
      expect(picker.instance().props.getFolderContent).toEqual(
        getFolderContentMock
      );
      expect(picker.instance().props.onPick).toBeDefined();
      expect(picker.instance().props.onCancel).toBeDefined();
    });

    describe("componentDidMount", () => {
      it("calls componentDidMount", () => {
        picker.instance().componentDidMount();
        expect(getFolderContentMock).toBeCalled();
      });

      it("should fetch, and put folders in state if ok", () => {
        const foldersProp = picker.state("folders");

        // expect(is(foldersProp, mockFolders)).toBeTruthy();
        expect(foldersProp).toEqual(mockFolders);
      });
    });

    describe("<Header />", () => {
      let header;

      beforeEach(() => {
        header = picker.find("Picker__Header");
      });

      it("renders <Header /> corretly", () => {
        expect(header).toBeDefined();
      });

      it("should set <Navigation /> porps correctly", () => {
        const navigation = header.children();

        expect(is(navigation.prop("path"), mockPath)).toBeTruthy();
        expect(navigation.prop("folders")).toEqual(mockFolders);
        // expect(is(navigation.prop("folders"), mockFolders)).toBeTruthy();
      });
    });

    describe("<Loader />", () => {
      it("renders picker loader", () => {
        const picker = shallow(
          <Picker getFolderContent={jest.fn(() => Promise.resolve(null))} />
        );
        expect(picker.find("Picker__Loader")).toBeDefined();
      });
    });

    describe("<ItemsList />", () => {
      let section, itemsList;

      beforeEach(() => {
        section = picker.find("Picker__Section");
        itemsList = section.children();
      });

      it("should render <ItemsList /> correctly", () => {
        expect(itemsList).toBeDefined();
      });

      it("should be defined <ItemsList /> porps", () => {
        const selectedItemIdMock = ROOT_FOLDER_ID;
        const currentFolderIdMock = ROOT_FOLDER_ID;
        const itemsMock = mockFolders.getIn(
          [currentFolderIdMock, "items"],
          null
        );
        const isFolderSelectionOnlyMock = picker.instance().props
          .isFolderSelectionOnly;
        const onItemClickMock = picker.instance().onItemClick;
        const onItemDoubleClickMock = picker.instance().onItemDoubleClick;

        expect(itemsList.prop("selectedItemId")).toEqual(selectedItemIdMock);
        expect(is(itemsList.prop("items"), itemsMock)).toBeTruthy();
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

      it("renders <Footer />", () => {
        expect(footer).toBeDefined();
      });

      it("renders <CancelButton /> and <ChooseButton />", () => {
        expect(footer.children().length).toBe(2);
      });

      it("should handle click events", () => {
        const cancelButton = footer.childAt(0);
        const chooseButton = footer.childAt(1);

        cancelButton.simulate("click");
        expect(picker.instance().props.onCancel).toBeCalled;

        chooseButton.simulate("click");
        expect(picker.instance().props.onPick).toBeCalled;
      });
    });
  });
});
