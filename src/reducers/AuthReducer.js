const INITIAL_STATE = {
  isSignedIn: null,
  hasTeam: null,
  user: {
    team: null,
    userId: null,
    profilePicture: null,
    name: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        user: {
          userId: action.payload.userId,
          profilePicture: action.payload.profilePicture,
          name: action.payload.name,
        },
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        hasTeam: false,
        user: { userId: null, profilePicture: null, name: null },
      };
    case "FETCH_TEAM":
      return {
        ...state,
        hasTeam: action.payload.teamStatus,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "LEAVE_TEAM":
      return {
        ...state,
        hasTeam: false,
      };
    default:
      return state;
  }
};
