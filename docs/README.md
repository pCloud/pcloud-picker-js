:exclamation: Two-Factor Authentication is currently NOT supported

## Table of Contents

- [NPM package](www)
- [Install](#install)
- [Usage](#usage)

## NPM package

## Install

`npm install picker --save`

## Usage

With the Picker you can get files or folders from pCloud into your web app.

Selecet file or folder from pCloud using the following method:

```js
import PcloudPicker from "picker";

PcloudPicker.getSelectedItem({
  clientId: "YOUR_CLIENT_ID",
  container: document.getElementById("pcloud-select"),
  isFolderSelectionOnly: true,
  onSelect: item => {
    console.log(item);
  },
  onClose: () => {}
});
```

This method takes a single options parameter with the following fields:

```js
options = {

  // Required. Client id of your app.
  clientId: string,

  // Required. DOM element where the button will be rendered.
  container: HTMLElement,

  // Optional. A value of false (default) allows the user to select both folders and files,
  // while true limits selection of files.
  isFolderSelectionOnly: true | false,

  // Required. Called when a user selects an item in the Picker.
  onSelect: item =>  void,

  // Optional. Called when the user closes the modal without selecting a item
  // and does not include any parameters.
  onCancel: () => void,
};
```

Handling the response

The item parameter in the above onSelect callback function will be an object, containing info about the selected item, whitch includes the following fields:

```js
item = {
  // Unique ID for the item.
  id: "id:...",

  // Name of the item.
  name: "filename.txt" | "New Folder",

  // Boolean, whether or not the item is folder
  isFolder: true | false
};
```

Upload file to pCloud account using the following method:

```js
import PcloudPicker from "picker";

PcloudPicker.uplodToFolder({
  clientId: "YOUR_CLIENT_ID",
  container: document.getElementById("pcloud-upload"),
  fileUrl: "https://...",
  onClose: () => {}
});
```

This method takes a single options parameter with the following fields:

```js
options = {
  // Required. Client id of your app.
  clientId: string,

  // Required. DOM element where the button will be rendered.
  container: HTMLElement,

  // Required. The url of the file to be uploaded.
  fileUrl: string,

  // Optional. Called when the user closes the modal without selecting a folder
  // and does not include any parameters.
  onCancel: () => void,
};
```
