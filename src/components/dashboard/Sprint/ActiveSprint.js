import React from "react";
import { connect } from "react-redux";

import StatusGroup from "./StatusGroup";

import { getStories, getSprints } from "../../../actions";

import "../../../stylesheets/active.css";

class ActiveSprint extends React.Component {
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
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="main-container active-sprint ml-4">
          <StatusGroup
            activeSprint={this.getCurrentSprint()}
            status={"To-do"}
          />
          <StatusGroup
            activeSprint={this.getCurrentSprint()}
            status={"In Progress"}
          />
          <StatusGroup
            activeSprint={this.getCurrentSprint()}
            status={"Completed"}
          />
        </div>
      </div>
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
