import icons from "./icons";

export const parseItem = ({
  folderid = "0",
  fileid = "0",
  isfolder = false,
  name = "",
  ismine = false,
  icon = 20
}) => ({
  id: isfolder ? folderid.toString() : fileid.toString(),
  isFolder: isfolder,
  name: name,
  isMine: ismine,
  iconId: icon
});

export const getIcon = iconId => icons[iconId];
