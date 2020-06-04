import React from "react";

import "../../stylesheets/backlog.css";

class Backlog extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="main-container">
          <div className="tab-container pl-2 mt-2">
            <button className="backlog-tab py-2 px-5 active">Backlog</button>
            <button className="backlog-tab py-2 px-5">Sprints</button>
            <div id="create-story" className="m-0 py-2 px-4 mr-3 float-right">
              Add A User Story
            </div>
          </div>
          <hr className="mt-0"></hr>
          <div className="backlog-container">
            <div className="row">
              <div className="col-8" id="backlog-list-container">
                List
              </div>
              <div className="col-4" id="story-preview">
                Details
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Backlog;
