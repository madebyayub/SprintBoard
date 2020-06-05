import React from "react";
import UserStory from "./Backlog/UserStory";

import "../../stylesheets/dashboard.css";
import "../../stylesheets/backlog.css";
import StoryDetail from "./Backlog/StoryDetail";

class Backlog extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="main-container">
          <div className="tab-container pl-2 mt-2">
            <button className="backlog-tab py-2 px-5 active">Backlog</button>
            <button className="backlog-tab py-2 px-5 ml-1">Sprints</button>
            <div
              id="create-story"
              className="m-0 py-2 px-4 mt-1 mr-3 float-right"
            >
              Add A User Story
            </div>
          </div>
          <div className="backlog-container pt-2">
            <div id="backlog-container-row" className="row">
              <div className="mb-2 ml-3" id="backlog-list-container">
                <UserStory />
                <UserStory />
                <UserStory />
              </div>
              <div className="ml-4" id="story-preview">
                <StoryDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
