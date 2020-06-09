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
    case "RESET_RESULTS":
      return {
        ...state,
        joinTeam: { searchResults: [] },
        makeTeam: { searchResults: [], status: "" },
      };
    default:
      return state;
  }
};
