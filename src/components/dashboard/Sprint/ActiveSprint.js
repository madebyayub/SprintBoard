import React from "react";
import { connect } from "react-redux";

import StatusGroup from "./StatusGroup";

import { getStories, getSprints } from "../../../actions";

import "../../../stylesheets/active.css";

class ActiveSprint extends React.Component {
  state = { currentSprint: null };
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
    for (let i = 0; i < this.props.currentUser.team.sprints.length; i++) {
      if (this.props.currentUser.team.sprints[i].current) {
        this.setState({
          currentSprint: this.props.currentUser.team.sprints[i],
        });
        break;
      }
    }
  }

  render() {
    console.log(this.state.currentSprint);
    return (
      <div className="container-fluid">
        <div className="main-container active-sprint ml-4">
          <StatusGroup
            activeSprint={this.state.currentSprint}
            status={"To-do"}
          />
          <StatusGroup
            activeSprint={this.state.currentSprint}
            status={"In Progress"}
          />
          <StatusGroup
            activeSprint={this.state.currentSprint}
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
