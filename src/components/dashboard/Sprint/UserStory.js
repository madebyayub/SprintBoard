import React from "react";

class UserStory extends React.Component {
  handleStoryChange = () => {
    this.props.changeStory(this.props.story);
  };
  render() {
    return (
      <div
        ref={this.props.referenceProp}
        className={`story-container mx-2 mb-1 px-2 py-2`}
        draggable="true"
        onClick={this.handleStoryChange}
      >
        <div className="col-10 story-title p-0">{this.props.story.title}</div>
        <div className="row ml-0">
          <div className="col-10 story-description pl-0">
            {this.props.story.description}
          </div>
          <div className="col-2 user-assigned">
            <img
              className="story-profile-pic"
              src={
                this.props.story.assigned
                  ? this.props.story.assigned.profilePic
                  : "https://ccivr.com/wp-content/uploads/2019/07/empty-profile.png"
              }
              alt="assigned profile"
            ></img>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStory;
