import ServerAPI from "../api/ServerAPI";
import history from "../history";
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
  history.push("/");
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
export const createTeam = (userID, username, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "post",
      url: `/team`,
      data: {
        userID,
        username,
        teamname: teamname.toLowerCase(),
      },
    });
    if (response.data.response === "Succesfully saved new team") {
      history.push("/backlog");
    }
    dispatch({ type: "CREATE_TEAM", payload: response.data });
  };
};
export const joinTeam = (userID, username, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/team`,
      data: {
        instruction: "ADD",
        userID,
        username,
        teamname: teamname.toLowerCase(),
      },
    });
    history.push("/backlog");
    dispatch({ type: "JOIN_TEAM", payload: response.data });
  };
};
export const fetchTeam = (userID) => {
  return async (dispatch) => {
    const response = await ServerAPI.get(`/team/user/${userID}`);
    const result = response.data.team ? true : false;
    if (result) {
      history.push("/backlog");
    } else {
      history.push("/");
    }
    dispatch({
      type: "FETCH_TEAM",
      payload: { team: response.data.team, teamStatus: result },
    });
  };
};
export const leaveTeam = (userID, username, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/team`,
      data: {
        instruction: "REMOVE",
        userID,
        username,
        teamname: teamname.toLowerCase(),
      },
    });
    history.push("/");
    dispatch({ type: "LEAVE_TEAM", payload: response.data });
  };
};

export const createStory = (storyData,team) => {
  return async (dispatch) => {
    const response = await ServerAPI({
        method: "post",
        url: '/story',
        data: {
         team: team,
         story: storyData
        },
    });
  }
}
