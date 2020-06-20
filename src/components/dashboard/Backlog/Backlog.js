import React from "react";
import StoryModal from "../../StoryModal";
import BacklogContainer from "./BacklogContainer";
import SprintContainer from "./SprintContainer";
import "../../../stylesheets/backlog.css";
import { connect } from "react-redux";
import { getStories, deleteStory, createSprint } from "../../../actions";

class Backlog extends React.Component {
  state = { activeTab: "Backlog", showModal: false, selectedStories: [] };

  /*
    Component lifecycle methods
    Mount: Fetches all the stories of the current team to
           display correct stories within the backlog container
  */
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
  }

  /* 
    Functions to Add or Remove Stories from the selectedStories State.
    These functions allow users to add or remove stories that they want
    to assign to the new sprint.
  */
  addStoryToState = (story) => {
    this.setState({ selectedStories: [...this.state.selectedStories, story] });
  };
  removeStoryFromState = (story) => {
    const newList = this.state.selectedStories.filter((stateStory) => {
      return story !== stateStory;
    });

    this.setState({ selectedStories: newList });
  };

  /*
    Functions to manage the current tab displayed and 
    whether the create story modal should be displayed
  */
  switchTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  /*
    Function to create a sprint, executes if there is at least
    1 story selected within the backlog container.
  */
  createSprint() {
    if (this.state.selectedStories.length > 0) {
      const sprintNumber = this.props.currentUser.team.sprints.length + 1;
      const sprintdata = {
        number: sprintNumber,
        current: false,
        stories: this.state.selectedStories,
      };
      this.props.createSprint(this.props.currentUser.team, sprintdata);
      this.setState({ selectedStories: [] });
    }
  }

  /*
    Render Functions
  */
  renderContainer() {
    if (this.state.activeTab === "Backlog") {
      return (
        <BacklogContainer
          removeStoryFromSprint={this.removeStoryFromState}
          addStoryToSprint={this.addStoryToState}
          selectedStories={this.state.selectedStories}
          currentUser={this.props.currentUser}
        />
      );
    } else {
      return (
        <SprintContainer
          removeStoryFromSprint={this.removeStoryFromState}
          addStoryToSprint={this.addStoryToState}
          selectedStories={this.state.selectedStories}
          currentUser={this.props.currentUser}
        />
      );
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
              <div
                id="create-sprint"
                className="m-0 py-2 px-4 mt-1 mr-3"
                onClick={() => this.createSprint()}
              >
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
export default connect(mapStateToProps, {
  getStories,
  deleteStory,
  createSprint,
})(Backlog);
