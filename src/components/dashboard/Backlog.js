import React from "react";
import UserStoryList from "./Backlog/UserStoryList";
import UserStory from "./Backlog/UserStory";
import StoryDetail from "./Backlog/StoryDetail";
import StoryModal from "../StoryModal";
import "../../stylesheets/dashboard.css";
import "../../stylesheets/backlog.css";
import { connect } from "react-redux";
import { getStories } from "../../actions";

class Backlog extends React.Component {
  state = { activeTab: "Backlog", showModal: false, activeStory: null };
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
  }
  componentDidUpdate() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
  }
  switchTab = (tab) => {
    this.setState({ activeTab: tab });
  };
  changeStory = (story) => {
    this.setState({ activeStory: story });
  };
  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };
  renderUserStories() {
    if (typeof this.props.currentUser.team.stories[0] !== "string") {
      return this.props.currentUser.team.stories.map((story) => {
        return (
          <div
            className="story-container-backlog ml-2 mr-0 px-2 py-2"
            key={story._id}
          >
            <UserStory story={story} changeStory={this.changeStory} />
          </div>
        );
      });
    }
    return <></>;
  }

  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="main-container">
            <div className="tab-container pl-2 mt-2">
              <button
                className={`backlog-tab py-2 px-5 ${
                  this.state.activeTab === "Backlog" ? "active" : ""
                }`}
                onClick={() => this.switchTab("Backlog")}
              >
                Backlog
              </button>
              <button
                className={`backlog-tab py-2 px-5 ml-1 ${
                  this.state.activeTab === "Sprints" ? "active" : ""
                }`}
                onClick={() => this.switchTab("Sprints")}
              >
                Sprints
              </button>
              <div
                id="create-story"
                className="m-0 py-2 px-4 mt-1 mr-3 float-right"
                onClick={this.toggleModal}
              >
                Add A User Story
              </div>
            </div>
            <div className="backlog-container pt-2">
              <div id="backlog-container-row">
                <div className="mb-2" id="backlog-list-container">
                  <label id="numStories" className="mr-3">
                    {this.props.currentUser
                      ? this.props.currentUser.team.stories.length
                      : ""}{" "}
                    User Stories
                  </label>
                  {this.renderUserStories()}
                </div>
                <div id="story-preview" className="ml-3 mb-1">
                  <StoryDetail
                    changeStory={this.changeStory}
                    story={this.state.activeStory}
                  />
                </div>
              </div>
            </div>
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
export default connect(mapStateToProps, { getStories })(Backlog);
