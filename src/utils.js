export const parseItem = ({ id = 0, folderid = 0, fileid = 0, isfolder = false, name = '', ismine = false }) => {
  const item = {
    id: id,
    isFolder: isfolder,
    name: name,
    isMine: ismine
  };

  if (isfolder) {
    item.folderId = folderid;
  } else {
    item.fileId = fileid;
  }

  return item;
};