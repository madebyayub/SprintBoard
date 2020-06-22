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
    case "GET_STORIES":
      return {
        ...state,
        user: {
          ...state.user,
          team: {
            ...state.user.team,
            stories: action.payload.stories,
          },
        },
      };
    case "CREATE_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: {
            ...state.user.team,
            stories: action.payload.stories,
          },
        },
      };
    case "EDIT_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: {
            ...state.user.team,
            stories: action.payload.stories,
            sprints: action.payload.sprints,
          },
        },
      };

    case "DELETE_STORY":
      return {
        ...state,
        user: {
          ...state.user,
          team: {
            ...state.user.team,
            stories: action.payload.stories,
          },
        },
      };
    case "CREATE_SPRINT":
      return {
        ...state,
        user: {
          ...state.user,
          team: action.payload,
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
