import ServerAPI from "../api/ServerAPI";
import history from "../history";
import { notifySuccess } from "../utils/utils";

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

export const createTeam = (userID, username, userpicture, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "post",
      url: `/team`,
      data: {
        userID,
        username,
        userpicture,
        teamname: teamname,
      },
    });
    if (response.data.response === "Succesfully saved new team") {
      history.push("/backlog");
    }
    dispatch({ type: "CREATE_TEAM", payload: response.data });
  };
};
export const joinTeam = (userID, username, userpicture, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/team`,
      data: {
        instruction: "ADD",
        userID,
        username,
        userpicture,
        teamname: teamname,
      },
    });
    history.push("/backlog");
    dispatch({ type: "JOIN_TEAM", payload: response.data });
  };
};
export const updateUser = (userID, userpicture, username) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/user`,
      data: {
        userID,
        username,
        userpicture,
      },
    });
    dispatch({ type: "UPDATE_USER", payload: response.data });
  };
};

export const initialFetchTeam = (team, teamStatus) => {
  return {
    type: "FETCH_TEAM",
    payload: { team, teamStatus },
  };
};

export const fetchTeam = (userID) => {
  return async (dispatch) => {
    const response = await ServerAPI.get(`/user/team/${userID}`);
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

export const editTeamName = (team, newTeamName) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/team`,
      data: {
        instruction: "CHANGE_NAME",
        teamname: team.name,
        newTeamName,
      },
    });
    dispatch({ type: "CHANGE_TEAMNAME", payload: response.data });
  };
};

export const leaveTeam = (userID, team) => {
  return async (dispatch) => {
    let response;
    if (team.members.length === 1) {
      response = await ServerAPI({
        method: "delete",
        url: "/team",
        data: {
          teamId: team._id,
          userID,
        },
      });
    } else {
      response = await ServerAPI({
        method: "patch",
        url: `/team`,
        data: {
          instruction: "REMOVE",
          userID,
          teamname: team.name,
        },
      });
    }
    history.push("/");
    dispatch({ type: "LEAVE_TEAM", payload: response.data });
  };
};
export const kickTeam = (userID, username, teamname) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "patch",
      url: `/team`,
      data: {
        instruction: "REMOVE",
        userID,
        teamname: teamname,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Successfully kicked " + username);
    }
    dispatch({ type: "KICK_TEAM", payload: response.data });
  };
};

export const createStory = (storyData, team) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "post",
      url: "/story",
      data: {
        team: team,
        story: storyData,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Successfully created new story");
    }
    dispatch({ type: "CREATE_STORY", payload: response.data });
  };
};
export const editUserStory = (storyData, team) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "put",
      url: `/story`,
      data: {
        team: team,
        story: storyData,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Successfully edited story");
    }
    dispatch({ type: "EDIT_STORY", payload: response.data });
  };
};

export const deleteStory = (story, team) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "delete",
      url: "/story",
      data: {
        team,
        story,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Successfully deleted story");
    }
    dispatch({ type: "DELETE_STORY", payload: response.data });
  };
};
export const createSprint = (team, sprintData) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "post",
      url: "/sprint",
      data: {
        team: team,
        sprint: sprintData,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Created Sprint " + sprintData.number);
    }
    dispatch({ type: "CREATE_SPRINT", payload: response.data });
  };
};
export const deleteSprint = (team, sprint) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "delete",
      url: "/sprint",
      data: {
        teamId: team._id,
        sprintId: sprint._id,
      },
    });
    if (response.status !== 404 || response.status !== 500) {
      notifySuccess("Successfully deleted Sprint " + sprint.number);
    }
    dispatch({ type: "DELETE_SPRINT", payload: response.data });
  };
};
export const getStories = (teamId, prevStories) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "get",
      url: `/story/${teamId}`,
    });
    if (
      !prevStories ||
      typeof prevStories[0] === "string" ||
      (prevStories[0] && typeof prevStories[0].author === "string")
    ) {
      dispatch({ type: "GET_STORIES", payload: response.data });
    }
  };
};

export const getSprints = (teamId) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "get",
      url: `/sprint/${teamId}`,
    });
    dispatch({ type: "GET_SPRINTS", payload: response.data });
  };
};
