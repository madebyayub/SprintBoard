import React from "react";
import "../../../stylesheets/backlog.css";

class UserStory extends React.Component {
  handleCheckChange(e) {
    if (e.target.checked) {
      this.props.addStoryToSprint(e.target.value);
    } else {
      this.props.removeStoryFromSprint(e.target.value);
    }
  }

  /*
    Render Functions
  */
  renderCheckBox() {
    if (!this.props.sprintContainer) {
      return (
        <div className="form-check" onClick={(e) => e.stopPropagation()}>
          <input
            className="form-check-input position-static"
            type="checkbox"
            id="blankCheckbox"
            onChange={(e) => this.handleCheckChange(e)}
            value={this.props.story._id}
            aria-label="..."
          />
        </div>
      );
    } else {
      return (
        <div className="sprint-num-label">{this.props.story.sprint.number}</div>
      );
    }
  }
  renderActions() {
    if (!this.props.sprintContainer) {
      return (
        <button
          className="remove-story px-2"
          onClick={(e) => this.props.deleteStory(e, this.props.story)}
        >
          <i className="fas fa-trash"></i>
        </button>
      );
    } else {
      return (
        <button
          className="remove-story px-2"
          title="Move to Backlog"
          onClick={(e) => this.props.sendStoryToBacklog(e, this.props.story)}
        >
          <i className="fas fa-external-link-alt"></i>
        </button>
      );
    }
  }
  render() {
    return (
      <tr
        className="story-row"
        onClick={() => this.props.changeStory(this.props.story)}
      >
        <td>{this.renderCheckBox()}</td>
        <td>{this.props.story.title}</td>
        <td>{this.props.story.author.name}</td>
        <td>{this.props.story.status}</td>
        <td>{this.props.story.points}</td>
        <td>
          {this.props.story.assigned
            ? this.props.story.assigned.name
            : "Unassigned"}
        </td>
        <td>{this.renderActions()}</td>
      </tr>
    );
  }
}

export default UserStory;
