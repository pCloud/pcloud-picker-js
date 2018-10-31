import React from "react";
import { shallow } from "enzyme";
import { List } from "immutable";
import "jest-styled-components";

import { Item, ItemsList } from "../../components";
import { EmptyFolder } from "../../components/ItemsList";

describe("<ItemsList />", () => {
  const shallowItemsList = props => shallow(<ItemsList {...props} />);

  describe("render", () => {
    it("renders component correctly", () => {
      expect(shallowItemsList()).toMatchSnapshot();
    });

    it("renders component with no items", () => {
      const props = { items: List() };

      expect(shallowItemsList(props).find(EmptyFolder)).toHaveLength(1);
    });

    describe("<Item />", () => {
      let itemsList, item, props;

      beforeEach(() => {
        props = {
          items: List([
            {
              id: "1931240732",
              iconId: 20,
              name: "0000000",
              isMine: true,
              isFolder: true
            }
          ])
        };
        itemsList = shallowItemsList(props);
        item = itemsList.find(Item);
      });

      it("renders component correctly", () => {
        expect(itemsList.find(Item)).toHaveLength(1);
      });

      it("renders component props correctly", () => {
        expect(item.prop("id")).toEqual(props.items.first().id);
        expect(item.prop("iconId")).toEqual(props.items.first().iconId);
        expect(item.prop("name")).toEqual(props.items.first().name);
        expect(item.prop("isFolder")).toEqual(props.items.first().isFolder);
        expect(item.prop("isSelected")).toBeFalsy();
        expect(item.prop("onItemClick")).toEqual(
          itemsList.instance().props.onItemClick
        );
        expect(item.prop("onItemDoubleClick")).toEqual(
          itemsList.instance().props.onItemDoubleClick
        );
      });
    });
  });
});
