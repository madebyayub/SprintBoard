import React from "react";
import { connect } from "react-redux";
import { editUserStory, getStories } from "../../../actions";
import "../../../stylesheets/storydetail.css";

class StoryDetail extends React.Component {
  state = {
    title: "",
    status: "",
    point: "",
    description: "",
  };
  componentDidMount() {
    if (this.props.story) {
      this.setState({ title: this.props.story.title });
      this.setState({ status: this.props.story.status });
      this.setState({ point: this.props.story.points });
      this.setState({ description: this.props.story.description });
    }
  }
  componentDidUpdate(prevState) {
    if (
      (!prevState.story && this.props.story) ||
      (this.props.story && this.props.story._id !== prevState.story._id)
    ) {
      this.setState({ title: this.props.story.title });
      this.setState({ status: this.props.story.status });
      this.setState({ point: this.props.story.points });
      this.setState({ description: this.props.story.description });
    }
  }

  unselectStory = () => {
    this.props.changeStory(null);
  };

  editStory(e, storyId) {
    e.preventDefault();
    const storyData = {
      title: this.state.title,
      user: this.props.currentUser,
      description: this.state.description,
      status: this.state.status,
      assigned: null,
      point: this.state.point,
    };
    this.props.editUserStory(storyData, this.props.team, storyId);
    this.unselectStory();
  }
  renderSaveButton() {
    if (this.props.story) {
      return (
        <button
          className={"btn btn-success btn-sm mb-2 textEditButton"}
          onClick={(e) => this.editStory(e, this.props.story._id)}
        >
          Save
        </button>
      );
    } else {
      return <></>;
    }
  }
  renderContentDetail() {
    const info = {
      title: this.props.story.title,
      status: this.props.story.status,
      points: this.props.story.points,
      description: this.props.story.description,
    };
    return (
      <div className="detail-container pt-1 px-3">
        <div id="detail-header">
          <button
            id="unselectIcon"
            className="float-right px-2"
            onClick={this.unselectStory}
          >
            <i className="fas fa-times"></i>
          </button>
          <label className="mt-2" id="edit-header-label">
            Edit User Story
          </label>
        </div>
        <div id="titleDetail" className="mt-2">
          <label>Title</label>
          <input
            className={"detailInput mt-0 pl-2 py-2"}
            value={this.state.title ? this.state.title : info.title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>
        <div id="assignedDetail" className="mt-2">
          <label>Assigned To</label>
          <input className={"detailInput mt-0 pl-2 py-2"} />
        </div>
        <div id="stateDetail" className="mt-2">
          <label>State</label>
          <input
            className={"detailInput mt-0 pl-2 py-2"}
            value={this.state.status ? this.state.status : info.status}
            onChange={(e) => this.setState({ status: e.target.value })}
          />
        </div>
        <div id="pointsDetail" className="mt-2">
          <label>Points</label>
          <input
            className={"detailInput mt-0 pl-2 py-2"}
            value={this.state.point ? this.state.point : info.points}
            onChange={(e) => this.setState({ point: e.target.value })}
          />
        </div>
        <div id="descriptionDetail" className="my-2">
          <label>Description</label>
          <textarea
            className={"detailInput mt-0 pl-2 py-2"}
            value={
              this.state.description ? this.state.description : info.description
            }
            onChange={(e) => this.setState({ description: e.target.value })}
            rows="4"
          />
        </div>
        {this.renderSaveButton()}
      </div>
    );
  }

  render() {
    if (this.props.story) {
      return (
        <div id="story-preview" className="ml-3 mb-1 show">
          {this.renderContentDetail()}
        </div>
      );
    } else {
      return (
        <div id="story-preview" className="ml-3 mb-1">
          {" "}
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.userId,
    team: state.auth.user.team,
  };
};

export default connect(mapStateToProps, { editUserStory, getStories })(
  StoryDetail
);
