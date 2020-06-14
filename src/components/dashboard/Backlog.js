import React from "react";
import UserStoryList from "./Backlog/UserStoryList";
import UserStory from "./Backlog/UserStory";
import StoryDetail from "./Backlog/StoryDetail";
import StoryModal from "../StoryModal";
import "../../stylesheets/dashboard.css";
import "../../stylesheets/backlog.css";
import { connect } from "react-redux";
import { getStories } from "../../actions";
import SprintStory from "./Backlog/SprintStory";

class Backlog extends React.Component {
  state = { activeTab: "Backlog", showModal: false };

  componentDidMount() {
    this.props.getStories(this.props.currentUser.team._id);
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
    this.props.getStories(this.props.currentUser.team._id);
  }

  renderUserStories() {
    if (this.state.activeTab === "Backlog" ){
      if (typeof this.props.currentUser.team.stories[0] !== "string") {
        return this.props.currentUser.team.stories.map((story) => {
          return (
            <div className="story-container mx-2 mb-1 px-2 py-2" key={story._id}>
              <UserStory title={story.title} assignedKey={story._id} />
            </div>
          );
        });
      }
      else{
        return <></>; 
      }
    }
     else {
    return <div>
      <SprintStory />
    </div>;
    }
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
              <div id="backlog-container-row" className="row">
                <div className="mb-2 ml-3" id="backlog-list-container">
                  {this.renderUserStories()}
                </div>
                <div className="ml-4" id="story-preview">
                  <StoryDetail />
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
