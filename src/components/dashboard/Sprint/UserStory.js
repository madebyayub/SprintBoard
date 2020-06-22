import React from "react";

class UserStory extends React.Component {
  render() {
    return (
      <div className={`story-container mx-2 mb-1 px-2 py-2`}>
        <div className="story-title ml-1">{this.props.story.title}</div>
        <div className="row ml-1">
          <div className="col-8 story-description pl-0">
            {this.props.story.description}
          </div>
          <div className="col-4 user-assigned">
            {this.props.story.author.name}
          </div>
        </div>
      </div>
    );
  }
}

export default UserStory;
