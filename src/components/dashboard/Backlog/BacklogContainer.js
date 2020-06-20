import React from "react";
import UserStory from "./UserStory";
import StoryDetail from "./StoryDetail";
import { connect } from "react-redux";
import { deleteStory } from "../../../actions";

import "../../../stylesheets/backlog.css";

class BacklogContainer extends React.Component {
  state = { activeStory: null };

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
    console.log(story);
    this.setState({ activeStory: story });
  };
  deleteStory = (e, story) => {
    if (this.state.activeStory && story._id === this.state.activeStory._id) {
      this.changeStory(null);
    }
    e.stopPropagation();
    this.props.deleteStory(story);
  };

  /*
    Render Functions
  */
  renderStories() {
    // Loop through all stories that team has, then if it's not part of a sprint display

    if (
      this.props.currentUser.team.stories !== undefined &&
      this.props.currentUser.team.stories.length > 0
    ) {
      // Returns an array of JSX, where if that story has a sprint, returns null instead.
      let jsxArray = this.props.currentUser.team.stories.map((story) => {
        if (!story.sprint) {
          return (
            <React.Fragment key={story._id}>
              <UserStory
                addStoryToSprint={this.props.addStoryToSprint}
                removeStoryFromSprint={this.props.removeStoryFromSprint}
                story={story}
                deleteStory={this.deleteStory}
                changeStory={this.changeStory}
              />
            </React.Fragment>
          );
        } else {
          return null;
        }
      });

      // Filter out all the null elements
      jsxArray = jsxArray.filter((elem) => {
        return elem != null;
      });
      // If all stories have a sprint, display the empty message.
      if (jsxArray.length > 0) {
        return jsxArray;
      } else {
        return (
          <tr className="empty-row">
            <td></td>
            <td>Your team has no stories in the backlog</td>
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
      return (
        <tr className="empty-row">
          <td></td>
          <td>Your team has no stories in the backlog</td>
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
  }
  render() {
    return (
      <>
        <div className="mb-2" id="backlog-list-container">
          <table className="table table-borderless mt-2 mb-0">
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
            <tbody>{this.renderStories()}</tbody>
          </table>
          <label id="numStories" className="mr-3 pt-2">
            {this.props.currentUser
              ? this.props.currentUser.team.stories.length
              : ""}{" "}
            Total User Stories
          </label>
        </div>
        <StoryDetail
          changeStory={this.changeStory}
          story={this.state.activeStory}
        />
      </>
    );
  }
}

export default connect(null, { deleteStory })(BacklogContainer);
