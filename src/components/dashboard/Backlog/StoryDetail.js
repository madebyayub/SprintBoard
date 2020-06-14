import React from "react";
import "../../../stylesheets/storydetail.css";

class StoryDetail extends React.Component {
  state = { editStory: false };

  allowEdits = () => {
    this.setState((prevState) => ({
      editStory: !prevState.editStory,
    }));
  };
  unselectStory = () => {
    this.setState({ editStory: false });
    this.props.changeStory(null);
  };
  renderEmptyDetail() {
    return (
      <div className="detail-container empty">
        <div className="empty-message icon">
          <i className="far fa-edit"></i>
        </div>
        <div className="empty-message">
          <div>Looks like there isn't a story selected</div>
        </div>
        <div className="empty-message mt-1">
          <div>Click on a story to show or edit it's details here</div>
        </div>
      </div>
    );
  }
  renderContentDetail() {
    return (
      <div className="detail-container pt-1 px-3">
        <button
          id="unselectIcon"
          className="float-left"
          onClick={this.unselectStory}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button id="editIcon" className="py-1 px-2" onClick={this.allowEdits}>
          <i
            className={`${
              this.state.editStory ? "fas fa-times" : "fa fa-pen"
            } mt-1`}
            aria-hidden="true"
          ></i>
        </button>
        <div id="titleDetail">
          <label>Title</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            placeholder={this.props.story.title}
            readOnly={!this.state.editStory}
          />
        </div>
        <div id="assignedDetail" className="mt-2">
          <label>Assigned To</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            placeholder={this.props.story.assigned}
            readOnly={!this.state.editStory}
          />
        </div>
        <div id="stateDetail" className="mt-2">
          <label>State</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            placeholder={this.props.story.status}
            readOnly={!this.state.editStory}
          />
        </div>
        <div id="pointsDetail" className="mt-2">
          <label>Points</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            placeholder={this.props.story.points}
            readOnly={!this.state.editStory}
          />
        </div>
        <div id="descriptionDetail" className="my-2">
          <label>Description</label>
          <textarea
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            placeholder={this.props.story.description}
            readOnly={!this.state.editStory}
            rows="3"
          />
        </div>
        <button
          className={`btn btn-success btn-sm mb-2 textEditButton ${
            this.state.editStory ? "text-editshow" : "text-edithide"
          }`}
        >
          Save
        </button>
      </div>
    );
  }
  render() {
    if (this.props.story) {
      return <>{this.renderContentDetail()}</>;
    } else {
      return <>{this.renderEmptyDetail()}</>;
    }
  }
}

export default StoryDetail;
