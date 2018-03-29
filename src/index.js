import PcloudPicker from "./picker";

const CLIENT_ID = "lh4j5JDeeCB";
const REDIRECT_URI = "http://localhost:3000/oauth.html";

PcloudPicker.createPcloudButton({
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  container: document.getElementById("pcloud-btn"),
  onSelect: item => {
    console.log(item);
  },
  onClose: () => {}
});
