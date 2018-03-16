import icons from './icons';

export const parseItem = ({ folderid = 0, fileid = 0, isfolder = false, name = '', ismine = false, icon = 20 }) => {
  const item = {
    isFolder: isfolder,
    name: name,
    isMine: ismine,
    iconId: icon
  };

  if (isfolder) {
    item.id = folderid;
  } else {
    item.id = fileid;
  }

  return item;
};

export const getIcon = iconId => icons[iconId];

export const debounce = fn => {
  let inDebounce;

  return () => {
    clearTimeout(inDebounce)

    inDebounce = setTimeout(() => fn(), 250)
  }
}