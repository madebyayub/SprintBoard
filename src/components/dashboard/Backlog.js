import React from "react";
import UserStoryList from "./Backlog/UserStoryList";
import StoryDetail from "./Backlog/StoryDetail";
import StoryModal from "../StoryModal";
import "../../stylesheets/dashboard.css";
import "../../stylesheets/backlog.css";

class Backlog extends React.Component {
  state = {activeTab: 'Backlog', showModal: false};


  switchTab = (tab) => {
    this.setState({activeTab: tab});
  }

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
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
                  <UserStoryList activeTab={this.state.activeTab} />
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
}

export default Backlog;
