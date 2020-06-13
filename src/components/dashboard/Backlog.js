import React from "react";
import UserStoryList from "./Backlog/UserStoryList";
import UserStory from "./Backlog/UserStory";
import StoryDetail from "./Backlog/StoryDetail";
import StoryModal from "../StoryModal";
import "../../stylesheets/dashboard.css";
import "../../stylesheets/backlog.css";
import {connect} from "react-redux";
import {getStories} from "../../actions";

class Backlog extends React.Component {
  state = {activeTab: 'Backlog', showModal: false};
  componentDidMount() {
    this.props.getStories(this.props.currentUser.team._id);
  }

  switchTab = (tab) => {
    this.setState({activeTab: tab});
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  renderUserStories () {

    if ( this.props.currentUser.team.stories.title === 'undefined' ) {
      return <div></div>;
    }
    else{
        return this.props.currentUser.team.stories.map((story) => {
        console.log(story._id);
        console.log("running this statement more than 4 time");
         return < UserStory title= {story.title} key={story._id} />
        });
    }
  }

  componentDidUpdate(){
    this.renderUserStories();
  }
  render() {
    
    console.log(this.props.currentUser.team.stories);

      return (
        <>
        <div className="container-fluid">
          <div className="main-container">
            <div className="tab-container pl-2 mt-2">
              <button className={`backlog-tab py-2 px-5 ${this.state.activeTab === 'Backlog' ? 'active' : ''}`} onClick= {() => this.switchTab('Backlog')}>Backlog</button>
              <button className={`backlog-tab py-2 px-5 ml-1 ${this.state.activeTab === 'Sprints' ? 'active' : ''}`} onClick= {() => this.switchTab('Sprints')}>Sprints</button>
              <div
                id="create-story"
                className="m-0 py-2 px-4 mt-1 mr-3 float-right" onClick={this.toggleModal}>
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
        <StoryModal openModal = {this.state.showModal} toggleModal= {this.toggleModal} />
        </>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    currentUser: {
      team: state.auth.user.team,
      userId: state.auth.user.userId,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePicture,
    }
  };
};
export default connect(mapStateToProps, {getStories}) (Backlog);
