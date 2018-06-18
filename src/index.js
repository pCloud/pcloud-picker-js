import PcloudPicker from "./picker";

const CLIENT_ID = "lh4j5JDeeCB";

PcloudPicker.getSelectedItem({
  clientId: CLIENT_ID,
  container: document.getElementById("pcloud-select"),
  isFolderSelectionOnly: true,
  onSelect: item => {
    console.log(item);
  },
  onClose: () => {}
});

PcloudPicker.uplodToFolder({
  clientId: CLIENT_ID,
  container: document.getElementById("pcloud-upload"),
  fileUrl:
    "https://i1.wp.com/chartcons.com/wp-content/uploads/Funny-Cat-Jokes2.jpg?resize=1021%2C576&ssl=1",
  onSuccess: () => {},
  onClose: () => {}
});
