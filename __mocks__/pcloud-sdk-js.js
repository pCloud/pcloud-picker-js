const MOCK_TOKEN = "123asd";
const MOCK_CLIENT = {
  listfolder: id => {
    switch (id) {
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
    }
  }
};
