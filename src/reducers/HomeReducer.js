const INITIAL_STATE = {
  joinTeam: {
    searchResults: [],
  },
  makeTeam: {
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
        makeTeam: { status: "" },
      };
    case "CREATE_TEAM":
      return {
        ...state,
        makeTeam: { status: action.payload.response },
      };
    case "JOIN_TEAM":
      return {
        ...state,
      };
    default:
      return state;
  }
};
