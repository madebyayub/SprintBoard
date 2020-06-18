import React from "react";
import StoryModal from "../../StoryModal";
import BacklogContainer from "./BacklogContainer";
import SprintContainer from "./SprintContainer";
import "../../../stylesheets/backlog.css";
import { connect } from "react-redux";
import { getStories, deleteStory, createSprint } from "../../../actions";

class Backlog extends React.Component {
  state = { activeTab: "Backlog", showModal: false };
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
  }
  switchTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };
  componentDidUpdate() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
  }
  createSprint () {
    const sprintNumber = this.props.currentUser.team.sprints.length + 1;
    const sprintdata= {
      number: sprintNumber,
      current: false,
    }
    this.props.createSprint(this.props.currentUser.team, sprintdata);
  }
  
  renderContainer() {
    if (this.state.activeTab === "Backlog") {
      return <BacklogContainer currentUser={this.props.currentUser} />;
    } else {
      return <SprintContainer currentUser={this.props.currentUser}/>;
    }
  }
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="main-container">
            <div className="tab-container pl-2 ml-3 mt-2">
              <button
                className={`backlog-tab py-1 px-3 ${
                  this.state.activeTab === "Backlog" ? "active" : ""
                }`}
                onClick={() => this.switchTab("Backlog")}
              >
                Backlog
              </button>
              <button
                className={`backlog-tab py-1 px-3 ml-1 ${
                  this.state.activeTab === "Sprints" ? "active" : ""
                }`}
                onClick={() => this.switchTab("Sprints")}
              >
                Sprints
              </button>
              <div id="create-sprint" className="m-0 py-2 px-4 mt-1 mr-3" onClick={() => this.createSprint()}>
                Create A Sprint
              </div>
              <div
                id="create-story"
                className="m-0 py-2 px-3 mt-1 mr-3"
                onClick={this.toggleModal}
              >
                <i className="fas fa-plus pr-2"></i>
                Add A User Story
              </div>
            </div>
            {this.renderContainer()}
          </div>
        </div>
        <StoryModal
          openModal={this.state.showModal}
          toggleModal={this.toggleModal}
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
export default connect(mapStateToProps, { getStories, deleteStory, createSprint })(Backlog);
