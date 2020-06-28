import React from "react";
import { connect } from "react-redux";
import SprintModal from "./SprintModal";
import StatusGroup from "./StatusGroup";
import { getStories, getSprints } from "../../../actions";

import "../../../stylesheets/active.css";

class ActiveSprint extends React.Component {
  state = { activeStory: null };

  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
    this.props.getSprints(this.props.currentUser.team._id);
  }

  getCurrentSprint() {
    for (let i = 0; i < this.props.currentUser.team.sprints.length; i++) {
      if (this.props.currentUser.team.sprints[i].current) {
        return this.props.currentUser.team.sprints[i];
      }
    }
    return null;
  }
  changeStory = (story) => {
    this.setState({ activeStory: story });
  };
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="main-container active-sprint ml-4">
            <StatusGroup
              changeStory={this.changeStory}
              activeSprint={this.getCurrentSprint()}
              status={"To-do"}
            />
            <StatusGroup
              changeStory={this.changeStory}
              activeSprint={this.getCurrentSprint()}
              status={"In Progress"}
            />
            <StatusGroup
              changeStory={this.changeStory}
              activeSprint={this.getCurrentSprint()}
              status={"Completed"}
            />
          </div>
        </div>
        <SprintModal
          changeStory={this.changeStory}
          story={this.state.activeStory}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: {
      team: state.auth.user.team,
      userId: state.auth.user.userId,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePicture,
    },
  };
};
export default connect(mapStateToProps, { getSprints, getStories })(
  ActiveSprint
);
