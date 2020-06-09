const INITIAL_STATE = {
  joinTeam: {
    searchResults: [],
  },
  makeTeam: {
    searchResults: [],
    status: "",
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "JOIN_SEARCH_TEAMNAME":
      return {
        ...state,
        joinTeam: {
          searchResults: action.payload,
        },
      };
    default:
      return state;
  }
};
