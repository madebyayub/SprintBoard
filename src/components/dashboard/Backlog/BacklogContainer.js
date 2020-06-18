import React from "react";
import UserStory from "./UserStory";
import StoryDetail from "./StoryDetail";
import { connect } from "react-redux";
import { deleteStory } from "../../../actions";

import "../../../stylesheets/backlog.css";

class BacklogContainer extends React.Component {
  state = { activeStory: null };
  changeStory = (story) => {
    this.setState({ activeStory: story });
  };
  deleteStory = (e, story) => {
    if (this.state.activeStory && story._id === this.state.activeStory._id) {
      this.changeStory(null);
    }
    e.stopPropagation();
    this.props.deleteStory(story);
  };
  renderStories() {
    if (
      this.props.currentUser.team.stories !== undefined &&
      this.props.currentUser.team.stories.length > 0
    ) {
      return this.props.currentUser.team.stories.map((story) => {
        return (
          <React.Fragment key={story._id}>
            <UserStory
              story={story}
              deleteStory={this.deleteStory}
              changeStory={this.changeStory}
            />
          </React.Fragment>
        );
      });
    } else if (this.props.currentUser.team.stories !== undefined) {
      return (
        <tr className="empty-row">
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
    console.log(this.props.currentUser.team);
    return (
      <>
        <div className="mb-2" id="backlog-list-container">
          <table className="table table-borderless mb-0">
            <thead>
              <tr id="backlog-list-header">
                <th scope="col">Title</th>
                <th scope="col">Made By</th>
                <th scope="col">Status</th>
                <th scope="col">Points</th>
                <th scope="col">Assigned To</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.renderStories()}</tbody>
          </table>
          <label id="numStories" className="mr-3 pt-2">
            {this.props.currentUser
              ? this.props.currentUser.team.stories.length
              : ""}{" "}
            User Stories
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
