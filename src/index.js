import PcloudPicker from "./picker";

const CLIENT_ID = "lh4j5JDeeCB";

PcloudPicker.getSelectedItem({
  clientId: CLIENT_ID,
  container: document.getElementById("pcloud-select"),
  isFolderSelectionOnly: false,
  onSelect: item => {
    console.log(item);
  },
  onClose: () => {}
});

PcloudPicker.uplodToFolder({
  clientId: CLIENT_ID,
  container: document.getElementById("pcloud-upload"),
  fileUrl: "https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg",
  onSuccess: () => {},
  onClose: () => {}
});
