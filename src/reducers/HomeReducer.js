const INITIAL_STATE = {
  makeTeam: {
    status: "",
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
