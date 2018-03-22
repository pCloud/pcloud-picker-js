import React from "react";
import { shallow } from "enzyme";
import { List } from "immutable";
import "jest-styled-components";

import { Item, ItemsList } from "../../components";
import { EmptyFolder } from "../../components/ItemsList";

describe("<ItemsList />", () => {
  describe("render", () => {
    it("renders component with no items", () => {
      const items = List();
      const itemsList = shallow(<ItemsList items={items} />);
      expect(itemsList.find(EmptyFolder)).toHaveLength(1);
    });
    it("renders component with items", () => {
      const items = List([
        {
          id: "0",
          iconId: 0,
          name: "",
          isFolder: false,
          isSelected: false,
          onItemClick: () => {},
          onItemDoubleClick: () => {}
        }
      ]);
      const itemsList = shallow(<ItemsList items={items} />);
      expect(itemsList.find(Item)).toHaveLength(1);
    });
  });
});
