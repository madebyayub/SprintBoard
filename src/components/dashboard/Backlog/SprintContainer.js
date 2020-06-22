import React from "react";
import UserStory from "../Backlog/UserStory";
import StoryDetail from "../Backlog/StoryDetail";
import { connect } from "react-redux";

import { editUserStory } from "../../../actions";
import "../../../stylesheets/sprintstory.css";

/* <button className="sprintDropdown dropdown-toggle"> Sprint</button>*/
class SprintContainer extends React.Component {
  state = {
    selectedSprint: null,
    numStories: 0,
    activeStory: null,
    currentSprintVal: null,
  };

  componentDidMount() {
    if (
      this.state.selectedSprint == null &&
      this.props.currentUser.team.sprints.length > 0
    ) {
      let currentSprint = this.props.currentUser.team.sprints.map((sprint) => {
        if (sprint.current === true) {
          return sprint;
        } else {
          return null;
        }
      });
      currentSprint = currentSprint.filter((elem) => {
        return elem != null;
      });
      if (currentSprint.length > 0) {
        this.setState({
          selectedSprint: currentSprint[0]._id,
          currentSprintVal: currentSprint[0]._id,
        });
      } else {
        this.setState({
          selectedSprint: this.props.currentUser.team.sprints[0]._id,
          currentSprintVal: this.props.currentUser.team.sprints[0]._id,
        });
      }
    }
  }

  sprintValue = (e) => {
    this.setState({ selectedSprint: e.target.value });
  };

  /*
    Change: This function runs when a user clicks on the
            story within the backlog container and changes
            the activeStory state so the correct story
            is displayed within the edit slide in view.

    Delete: This function deletes a story from the team's
            story list by calling the action creator that 
            requests to delete that story from the database. 
  */
  changeStory = (story) => {
    this.setState({ activeStory: story });
  };

  sendStoryToBacklog = (e, story) => {
    e.stopPropagation();
    const storyData = {
      title: story.title,
      user: this.props.currentUser.userId,
      description: story.description,
      status: story.status,
      assigned: story.assigned ? story.assigned._id : null,
      point: story.points,
      sprint: null,
    };
    this.props.editUserStory(storyData, this.props.team, story._id);
  };

  renderSprints() {
    return this.props.currentUser.team.sprints.map((sprint) => {
      if (this.state.currentSprintVal === sprint._id) {
        return <></>;
      } else {
        return (
          <React.Fragment key={sprint._id}>
            <option value={sprint._id}>Sprint {sprint.number}</option>
          </React.Fragment>
        );
      }
    });
  }

  renderSprintStories() {
    if (
      this.props.currentUser.team.stories !== undefined &&
      this.props.currentUser.team.stories.length > 0
    ) {
      if (this.state.selectedSprint != null) {
        let sprintstories = this.props.currentUser.team.stories.map(
          (sprintStory) => {
            if (sprintStory.sprint !== null) {
              if (sprintStory.sprint._id === this.state.selectedSprint) {
                return (
                  <React.Fragment key={sprintStory._id}>
                    <UserStory
                      sprintContainer
                      addStoryToSprint={this.props.addStoryToSprint}
                      removeStoryFromSprint={this.props.removeStoryFromSprint}
                      story={sprintStory}
                      sendStoryToBacklog={this.sendStoryToBacklog}
                      changeStory={this.changeStory}
                    />
                  </React.Fragment>
                );
              } else {
                return null;
              }
            } else {
              return undefined;
            }
          }
        );
        // Filter out all the null elements
        sprintstories = sprintstories.filter((elem) => {
          return elem != null;
        });
        // If the sprint has no stories, display the empty message.
        if (sprintstories.length > 0) {
          if (this.state.numStories !== sprintstories.length)
            this.setState({ numStories: sprintstories.length });
          return sprintstories;
        } else {
          if (this.state.numStories !== 0) this.setState({ numStories: 0 });
          return (
            <tr className="empty-row">
              <td></td>
              <td>Your team has no stories in this sprint</td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
              <td> </td>
            </tr>
          );
        }
        // If the the team's stories are empty, display the empty message.
      } else if (this.props.currentUser.team.stories !== undefined) {
        if (this.state.numStories !== 0) this.setState({ numStories: 0 });
        return (
          <tr className="empty-row">
            <td></td>
            <td>Your team has no stories in this sprint</td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        );
      } else {
        return <></>;
      }
    } else if (
      this.props.currentUser.team.stories !== undefined &&
      this.props.currentUser.team.stories.length === 0
    ) {
      return (
        <tr className="empty-row">
          <td>Empty</td>
          <td>Your team has no sprints to display</td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
          <td> </td>
        </tr>
      );
    }
  }

  render() {
    return (
      <div className="mb-2" id="backlog-list-container">
        <div className="dropdown sprintContainer m-2">
          <select
            className="dropdown-toggle sprintDropdown ml-3"
            onChange={(e) => this.sprintValue(e)}
          >
            <option selected value={this.state.currentSprintVal}>
              Current Sprint
            </option>
            {this.renderSprints()}
          </select>
        </div>
        <table className="table table-borderless sprint mt-2 mb-0">
          <thead>
            <tr id="backlog-list-header">
              <th className="check-col" scole="col"></th>
              <th className="title-col" scope="col">
                Title
              </th>
              <th className="person-col" scope="col">
                Made By
              </th>
              <th className="status-col" scope="col">
                Status
              </th>
              <th className="points-col" scope="col">
                Points
              </th>
              <th className="person-col" scope="col">
                Assigned To
              </th>
              <th className="actions-col" scope="col"></th>
            </tr>
          </thead>
          <tbody>{this.renderSprintStories()}</tbody>
        </table>
        <label id="numStories" className="mr-3 pt-2">
          {this.state.numStories} / {this.props.currentUser.team.stories.length}{" "}
          User Stories In This Sprint
        </label>
        <StoryDetail
          changeStory={this.changeStory}
          story={this.state.activeStory}
        />
      </div>
    );
  }
}
export default connect(null, { editUserStory })(SprintContainer);
