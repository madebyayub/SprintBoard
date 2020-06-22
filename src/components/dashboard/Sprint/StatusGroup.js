import React from "react";

import UserStory from "./UserStory";

class StatusGroup extends React.Component {
  renderIcon() {
    if (this.props.status === "To-do") {
      return <i className="fas fa-map-marker mr-2"></i>;
    } else if (this.props.status === "In-Progress") {
      return <i className="fas fa-sync-alt mr-2"></i>;
    } else {
      return <i className="fas fa-check-circle mr-2"></i>;
    }
  }
  renderStories() {
    if (this.props.activeSprint === null) {
      return <div id="noCurrentSprintMessage">No Active Sprint</div>;
    } else {
      return this.props.activeSprint.stories.map((story) => {
        if (story.status === this.props.status) {
          return <UserStory key={story._id} story={story} />;
        }
      });
    }
  }
  render() {
    return (
      <div className="status ml-1 mt-3">
        <div className="status-label mt-2 ml-3 mb-3">
          {this.renderIcon()}
          {this.props.status}
        </div>
        <div className="status-story-container">{this.renderStories()}</div>
      </div>
    );
  }
}

export default StatusGroup;
