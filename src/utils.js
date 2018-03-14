export const parseItem = ({ folderid = 0, fileid = 0, isfolder = false, name = '', ismine = false }) => {
  const item = {
    isFolder: isfolder,
    name: name,
    isMine: ismine
  };

  if (isfolder) {
    item.id = folderid;
  } else {
    item.id = fileid;
  }

  return item;
};