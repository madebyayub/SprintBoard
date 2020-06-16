import React from "react";
import { connect } from "react-redux";
import { editUserStory, getStories } from "../../../actions";
import "../../../stylesheets/storydetail.css";

class StoryDetail extends React.Component {
  state = { editStory: false, title: '', status:'', point:''};

  allowEdits = () => {
    this.setState((prevState) => ({
      editStory: !prevState.editStory,
    }));
    this.setState({title: this.props.story.title});
    this.setState({status: this.props.story.status});
    this.setState({point: this.props.story.points});
    this.setState({description: this.props.story.description});
  };
  unselectStory = () => {
    this.setState({ editStory: false });
    this.props.changeStory(null);
  };

  renderEditStory (e,storyId) {
    e.preventDefault();
    const storyData = {
      title: this.state.title,
      user: this.props.currentUser,
      description: this.state.description,
      status: this.state.status,
      assigned: null,
      point: this.state.point,
    };
    this.props.editUserStory(storyData,this.props.team, storyId);
    this.unselectStory();
  }

  componentDidUpdate (prevStory) {
    if(this.props.story && prevStory.story !== null ){
      if (this.props.story._id !== prevStory.story._id ) {
        this.setState({title: this.props.story.title});
        this.setState({status: this.props.story.status});
        this.setState({point: this.props.story.points});
        this.setState({description: this.props.story.description});
      }
    }
  }

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
            value={this.state.title}
            readOnly={!this.state.editStory}
            onChange= {(e) => this.setState({title: e.target.value})}
            />
        </div>
        <div id="assignedDetail" className="mt-2">
          <label>Assigned To</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            readOnly={!this.state.editStory}
          />
        </div>
        <div id="stateDetail" className="mt-2">
          <label>State</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            value={this.state.status}
            readOnly={!this.state.editStory}
            onChange= {(e) => this.setState({status: e.target.value})}
          />
        </div>
        <div id="pointsDetail" className="mt-2">
          <label>Points</label>
          <input
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            value={this.state.point}
            readOnly={!this.state.editStory}
            onChange= {(e) => this.setState({point: e.target.value})}
          />
        </div>
        <div id="descriptionDetail" className="my-2">
          <label>Description</label>
          <textarea
            className={`detailInput mt-0 pl-2 py-2 ${
              this.state.editStory ? "editState" : ""
            }`}
            value={this.state.description}
            readOnly={!this.state.editStory}
            onChange= {(e) => this.setState({description: e.target.value})}
            rows="3"
          />
        </div>
        <button
          className={`btn btn-success btn-sm mb-2 textEditButton ${
            this.state.editStory ? "text-editshow" : "text-edithide"
          }`}
          onClick={(e) => this.renderEditStory(e,this.props.story._id)}
        >
          Save
        </button>
      </div>
    );
  }

  render() {
    if (this.props.story) {
      console.log(this.props.story);
      return <>{this.renderContentDetail()}</>;
    } else {
      return <>{this.renderEmptyDetail()}</>;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.userId,
    team: state.auth.user.team,
  };
};

export default connect((mapStateToProps), { editUserStory, getStories }) (StoryDetail);
