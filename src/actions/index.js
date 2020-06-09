import ServerAPI from "../api/ServerAPI";

export const signIn = (userId, profilePicture, name) => {
  return {
    type: "SIGN_IN",
    payload: {
      userId,
      profilePicture,
      name,
    },
  };
};
export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};
export const searchTeamName = (teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI.get(`/team/${teamname}`);
    dispatch({ type: "JOIN_SEARCH_TEAMNAME", payload: response.data });
  };
};
export const resetResults = () => {
  return {
    type: "RESET_RESULTS",
  };
};
