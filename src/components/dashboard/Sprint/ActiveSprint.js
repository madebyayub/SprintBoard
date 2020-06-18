import React from "react";

import UserStory from "./UserStory";
import "../../../stylesheets/active.css";

class ActiveSprint extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="active-container">
          <div className="status-container mt-2">
            <div className="status ml-1">
              <div className="status-label mt-2 ml-3 mb-3">
                <i className="far fa-list-alt mr-2"></i>To-do
              </div>
              <div className="status-list-container">
                <UserStory />
                <UserStory />
                <UserStory />
              </div>
            </div>
            <div className="status ml-3">
              <div className="status-label mt-2 ml-3 mb-3">
                <i className="fas fa-spinner mr-2"></i>In progress
              </div>
              <div className="status-list-container">
                <UserStory />
                <UserStory />
                <UserStory />
              </div>
            </div>
            <div className="status ml-3">
              <div className="status-label mt-2 ml-3 mb-3">
                <i className="fas fa-check-circle mr-2"></i>Completed
              </div>
              <div className="status-list-container">
                <UserStory />
                <UserStory />
                <UserStory />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ActiveSprint;
