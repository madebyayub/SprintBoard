const INITIAL_STATE = {
  isSignedIn: null,
  user: {
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
        user: { userId: null, profilePicture: null, name: null },
      };
    default:
      return state;
  }
};
