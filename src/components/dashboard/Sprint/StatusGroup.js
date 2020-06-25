import React from "react";
import { connect } from "react-redux";
import { editUserStory } from "../../../actions";
import UserStory from "./UserStory";

class StatusGroup extends React.Component {

  componentDidMount() {
    this.statusContainer.addEventListener("dragover", this.handleDragOverEvent);
    this.statusContainer.addEventListener("drop", this.handleDropEvent);
  }
  componentWillUnmount() {
    this.statusContainer.removeEventListener(
      "dragover",
      this.handleDragOverEvent
    );
    this.statusContainer.removeEventListener("drop", this.handleDropEvent);
  }

  handleDragOverEvent = (e) => {
    e.preventDefault();
    /*const afterElement = this.getDragAfterElement(
      this.statusContainer,
      e.clientY
    );
    const storyContainer = document.querySelector(".dragging");
    this.statusContainer.children[1].appendChild(storyContainer);

    if (afterElement == null) {
      this.statusContainer.children[1].appendChild(storyContainer);
    } else {
      this.statusContainer.children[1].insertBefore(
        storyContainer,
        afterElement
      );
    }*/
  };

  getDragAfterElement(container, y) {
    const draggableElements = [
      ...container.querySelectorAll(".story-container:not(.dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }

  handleDropEvent = (e) => {
    e.preventDefault();
    const story = JSON.parse(e.dataTransfer.getData("transfer"));
    const storyData = {
      title: story.title,
      user: null,
      description: story.description,
      status: this.props.status,
      assigned: story.assigned,
      point: story.point,
      sprint: story.sprint,
    };
    this.props.editUserStory(storyData, this.props.team, story._id);
  };

  renderIcon() {
    if (this.props.status === "To-do") {
      return <i className="fas fa-map-marker mr-2"></i>;
    } else if (this.props.status === "In Progress") {
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
        } else {
          return null;
        }
      });
    }
  }
  render() {
    return (
      <div
        ref={(elem) => (this.statusContainer = elem)}
        className="status ml-1 mt-3"
      >
        <div className="status-label mt-2 ml-3 mb-3">
          {this.renderIcon()}
          {this.props.status}
        </div>
        <div className="status-story-container">{this.renderStories()}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    team: state.auth.user.team,
  };
};
export default connect(mapStateToProps, { editUserStory })(StatusGroup);
