const MOCK_TOKEN = "123asd";
const MOCK_CLIENT = {
  listfolder: id => {
    switch (id) {
      case 0:
        return Promise.resolve({
          path: "/",
          name: "/",
          created: "Wed, 07 Mar 2018 07:02:48 +0000",
          ismine: true,
          thumb: false,
          modified: "Wed, 07 Mar 2018 07:02:48 +0000",
          id: "d0",
          isshared: false,
          icon: 20,
          isfolder: true,
          folderid: 0,
          contents: [
            {
              path: "/Applications",
              name: "Applications",
              created: "Wed, 07 Mar 2018 08:37:56 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 08:37:56 +0000",
              comments: 0,
              id: "d1538637315",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1538637315
            },
            {
              path: "/My Music",
              name: "My Music",
              created: "Wed, 07 Mar 2018 07:02:48 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 07:02:48 +0000",
              comments: 0,
              id: "d1538452028",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1538452028
            },
            {
              path: "/My Pictures",
              name: "My Pictures",
              created: "Wed, 07 Mar 2018 07:02:48 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 07:02:48 +0000",
              comments: 0,
              id: "d1538452030",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1538452030
            },
            {
              path: "/My Videos",
              name: "My Videos",
              created: "Wed, 07 Mar 2018 07:02:48 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 07:02:48 +0000",
              comments: 0,
              id: "d1538452031",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1538452031
            },
            {
              path: "/name",
              name: "name",
              created: "Wed, 07 Mar 2018 12:02:23 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 14 Mar 2018 07:13:36 +0000",
              comments: 0,
              id: "d1539022774",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1539022774
            },
            {
              path: "/pCloud Help",
              name: "pCloud Help",
              created: "Wed, 07 Mar 2018 07:02:48 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 07:02:48 +0000",
              comments: 0,
              id: "d1538452032",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1538452032
            },
            {
              path: '/Saved "name" from link on Mar 7, 2018',
              name: 'Saved "name" from link on Mar 7, 2018',
              created: "Wed, 07 Mar 2018 12:00:44 +0000",
              ismine: true,
              thumb: false,
              modified: "Wed, 07 Mar 2018 12:00:44 +0000",
              comments: 0,
              id: "d1539020460",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1539020460
            },
            {
              path: '/Saved "name" from link on Mar 7, 2018 (1)',
              name: 'Saved "name" from link on Mar 7, 2018 (1)',
              created: "Wed, 07 Mar 2018 12:03:08 +0000",
              ismine: true,
              thumb: false,
              modified: "Fri, 16 Mar 2018 13:25:52 +0000",
              comments: 0,
              id: "d1539023959",
              isshared: false,
              icon: 20,
              isfolder: true,
              parentfolderid: 0,
              folderid: 1539023959
            },
            {
              name: "VSCodeSetup-x64-1.20.1.exe",
              created: "Wed, 07 Mar 2018 07:45:40 +0000",
              thumb: false,
              modified: "Wed, 07 Mar 2018 07:45:40 +0000",
              isfolder: false,
              fileid: 5682103824,
              hash: 6209240444731004342,
              comments: 0,
              path: "/VSCodeSetup-x64-1.20.1.exe",
              category: 0,
              id: "f5682103824",
              isshared: false,
              ismine: true,
              size: 44321336,
              parentfolderid: 0,
              contenttype: "application/x-msdos-program",
              icon: 16
            },
            {
              name: "wallpaper.jpg",
              created: "Wed, 14 Mar 2018 13:43:17 +0000",
              thumb: true,
              modified: "Wed, 14 Mar 2018 13:43:17 +0000",
              isfolder: false,
              height: 1200,
              fileid: 5776162161,
              width: 1920,
              hash: 18203789150339088526,
              comments: 0,
              path: "/wallpaper.jpg",
              category: 1,
              id: "f5776162161",
              isshared: false,
              ismine: true,
              size: 941162,
              parentfolderid: 0,
              contenttype: "image/jpeg",
              icon: 1
            }
          ]
        });
    }
  }
};

export default {
  createClient: token => {
    if (token === MOCK_TOKEN) {
      return MOCK_CLIENT;
    }

    return null;
  },
  oauth: {
    initOauthToken: ({ receiveToken }) => {
      return receiveToken(MOCK_TOKEN);
    },
    initOauthPollToken: ({ receiveToken }) => {
      return receiveToken(MOCK_TOKEN);
    }
  }
};
