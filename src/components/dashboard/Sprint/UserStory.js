import React from "react";

class UserStory extends React.Component {
  state = { top: 0 };
  componentDidMount() {
    this.storyContainer.addEventListener(
      "dragstart",
      this.handleDragStartEvent
    );
    this.storyContainer.addEventListener("dragend", this.handleDragEndEvent);
  }
  componentWillUnmount() {
    this.storyContainer.removeEventListener(
      "dragstart",
      this.handleDragStartEvent
    );
    this.storyContainer.removeEventListener("dragend", this.handleDragEndEvent);
  }
  handleDragEndEvent = (e) => {
    this.storyContainer.classList.remove("dragging");
  };

  handleDragStartEvent = (e) => {
    e.dataTransfer.setData("transfer", JSON.stringify(this.props.story));
    this.storyContainer.classList.add("dragging");
  };
  handleStoryChange = () => {
    this.props.changeStory(this.props.story);
  };
  render() {
    return (
      <div
        ref={(elem) => (this.storyContainer = elem)}
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
