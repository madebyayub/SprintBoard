const INITIAL_STATE = {
  isSignedIn: null,
  hasTeam: null,
  user: {
    team: null,
    userID: null,
    profilePic: null,
    name: null,
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        user: { ...action.payload.user, team: state.user.team },
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        hasTeam: false,
        user: { userID: null, profilePic: null, name: null },
      };
    case "UPDATE_USER":
      return {
        ...state,
        user: { ...action.payload.user, team: state.user.team },
      };
    case "UPDATE_USER_CHANNELS":
      return {
        ...state,
        user: { ...state.user, channels: action.payload },
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
        user: {
          team: action.payload.team,
        },
      };
    case "KICK_TEAM":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "CHANGE_TEAMNAME":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "GET_STORIES":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "CREATE_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "EDIT_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "DELETE_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "CREATE_SPRINT":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "DELETE_SPRINT":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload.team,
        },
      };
    case "GET_SPRINTS":
      return {
        ...state,
        user: {
          ...state.user,
          team: {
            ...state.user.team,
            sprints: action.payload,
          },
        },
      };
    default:
      return state;
  }
};
