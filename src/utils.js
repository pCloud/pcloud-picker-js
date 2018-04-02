// @flow

import icons from "./icons";

type item = {
  path: string,
  folderid: string,
  fileid: string,
  isfolder: boolean,
  name: string,
  ismine: boolean,
  icon: number
};

export type selectedItemType = {
  id: string,
  isFolder: boolean,
  name: string
};

export const parseItem = ({
  folderid = "0",
  fileid = "0",
  isfolder = false,
  name = "",
  ismine = false,
  icon = 20
}: item) => ({
  id: isfolder ? folderid.toString() : fileid.toString(),
  isFolder: isfolder,
  name: name,
  isMine: ismine,
  iconId: icon
});

export const parseSelectedItem = ({
  id = "",
  isFolder = false,
  name = ""
}: selectedItemType) => ({
  id: id,
  isFolder: isFolder,
  name: name
});

export const getIcon = (iconId: number) => icons[iconId];
