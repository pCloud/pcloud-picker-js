import { List } from 'immutable';

export const parseItem = ({ id = 0, folderid = 0, isfolder = false, name = '', ismine = false }) => {
  return {
    id: id,
    folderId: folderid,
    isFolder: isfolder,
    name: name,
    isMine: ismine
  }
}