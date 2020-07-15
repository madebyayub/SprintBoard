import ServerAPI from "../api/ServerAPI";
import history from "../history";
import { notifySuccess } from "../utils/utils";

/* Sign in action, sets the currentUser state 
  PARAMS:
    userID: The google ID of the current user
    profilePic: The google profile picture of the current user
    name: The google profile name of the current user */
export const signIn = (userID) => {
  return async (dispatch) => {
    const response = await ServerAPI.get(`/user/${userID}`);
    dispatch({ type: "SIGN_IN", payload: response.data });
  };
};

/* Sign out action, pushes the user to the home page */
export const signOut = () => {
  history.push("/");
  return {
    type: "SIGN_OUT",
  };
};

/* Update User action, called upon login to send a patch request to API server and update user info 
  PARAMS:
    userID: The google ID of the current user
    username: The google profile name of the current user
    userpicture: The google profile picture of the current user */
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

export const updateUserChannels = (channels) => {
  return {
    type: "UPDATE_USER_CHANNELS",
    payload: channels,
  };
};

/* Create team action, makes a POST request to API server 
  PARAMS:
    userID: The google ID of the current user
    userpicture: The google profile picture of the current user
    username: The google profile name of the current user 
    teamname: The team name of the team to be created */

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

/* Join team action, sets a patch request to API server to append user to the members list of the team 
  PARAMS:
    userID: The google ID of the current user
    username: The google profile name of the current user
    userpicture: The google profile picture of the current user
    teamname: The team name of the team to be created */

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

/* The first fetch team action, used to render a loading view when fetching users team 
  PARAMS:
    team: The team object of the user
    teamStatus: The value to set the hasTeam global state */
export const initialFetchTeam = (team, teamStatus) => {
  return {
    type: "FETCH_TEAM",
    payload: { team, teamStatus },
  };
};

/* Fetch team action responsible for getting the user's team information. Makes GET request to Server API 
  PARAMS:
    userID: The google ID of the current user */
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

/* Edit team name action, makes a patch request to the API server to update the team name 
  PARAMS:
    team: The team object of the user
    newTeamName: The new team name to change the team name to */
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

/* Leave team action, makes a DELETE request if last member of a team, or a PATCH request to update members list 
  PARAMS:
    userID: The google ID of the current user 
    team: The team object of the current user */
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

/* Kick a member from the team action, sends a patch request to the API server 
  PARAMS:
    userID: The google ID of the current user 
    username: The google name of the current user
    teamname: The name of the team of the current user */
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

/* Create a story action, sends a POST request to the API Server
  PARAMS:
    storyData: The information of the story
    team: The team object of the current user */
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

/* Edit a story action, sends a PUT request to the API Server
  PARAMS:
    storyData: The information of the story
    team: The team object of the current user */
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

/* Delete a story action, sends a DELETE request to the API Server
  PARAMS:
    story: The story object to be deleted
    team: The team object of the current user */
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

/* Create a sprint action, sends a POST request to the API Server
  PARAMS:
    sprintData: The information of the sprint
    team: The team object of the current user */
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

/* Delete a sprint action, sends a DELETE request to the API Server
  PARAMS:
    sprint: The sprint to be deleted
    team: The team object of the current user */
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

/* Get the stories of a team, sends a GET request to the API Server
  PARAMS:
    teamId: The id of the team of the current user
    prevStories: The previous stories of the team */
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

/* Get the sprints of a team, sends a GET request to the API Server
  PARAMS:
    teamId: The id of the team of the current user */
export const getSprints = (teamId) => {
  return async (dispatch) => {
    const response = await ServerAPI({
      method: "get",
      url: `/sprint/${teamId}`,
    });
    dispatch({ type: "GET_SPRINTS", payload: response.data });
  };
};
