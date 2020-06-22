import React from "react";

class UserStory extends React.Component {
  render() {
    return (
      <div className={`story-container mx-2 mb-1 px-2 py-2`}>
        <div className="row ml-1">
          <div className="col-8 story-title p-0">{this.props.story.title}</div>
          <div className="col-4 story-points">
            {this.props.story.points} Points
          </div>
        </div>
        <div className="row mt-1 ml-1">
          <div className="col-10 story-description pl-0">
            {this.props.story.description}
          </div>
          <div className="col-2 user-assigned">
            <img
              className="story-profile-pic"
              src={this.props.story.author.profilePic}
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStory;
