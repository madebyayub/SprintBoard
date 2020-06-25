import React from "react";
import { connect } from "react-redux";
import { editUserStory } from "../../../actions";
import "../../../stylesheets/storydetail.css";

class StoryDetail extends React.Component {
  state = {
    title: "",
    status: "",
    point: "",
    description: "",
    assigned: null,
    sprint: null,
    titleError: false,
    pointError: false,
  };
  componentDidMount() {
    if (this.props.story) {
      this.setState({
        title: this.props.story.title,
        status: this.props.story.status,
        point: this.props.story.points,
        description: this.props.story.description,
        assigned: this.props.story.assigned
          ? this.props.story.assigned._id
          : null,
        sprint: this.props.story.sprint ? this.props.story.sprint._id : null,
      });
    }
  }
  componentDidUpdate(prevState) {
    if (
      (!prevState.story && this.props.story) ||
      (this.props.story && this.props.story._id !== prevState.story._id)
    ) {
      this.setState({
        title: this.props.story.title,
        status: this.props.story.status,
        point: this.props.story.points,
        description: this.props.story.description,
        assigned: this.props.story.assigned
          ? this.props.story.assigned._id
          : null,
        sprint: this.props.story.sprint ? this.props.story.sprint._id : null,
        titleError: false,
        pointError: false,
      });
    }
  }
  dropdownSprint = (e) => {
    this.setState({ sprint: e.target.value });
  };
  dropdownUser = (e) => {
    this.setState({ assigned: e.target.value });
  };
  dropdownState = (e) => {
    this.setState({ status: e.target.value });
  };
  unselectStory = () => {
    this.props.changeStory(null);
    this.setState({
      titleError: false,
      pointError: false,
    })
  };

  editStory(e, storyId) {
    e.preventDefault();
    const storyData = {
      title: this.state.title,
      user: this.props.currentUser,
      description: this.state.description,
      status: this.state.status,
      assigned: this.state.assigned,
      point: this.state.point,
      sprint: this.state.sprint,
    };
    this.props.editUserStory(storyData, this.props.team, storyId);
    this.unselectStory();
    this.setState({
      titleError: false,
      pointError: false,
    })
  }
  renderSprints() {
    if (this.props.story) {
      let sprintsListFiltered = this.props.team.sprints;
      if (this.props.story.sprint) {
        sprintsListFiltered = this.props.team.sprints.filter((sprint) => {
          return sprint._id !== this.props.story.sprint._id;
        });
      }
      return sprintsListFiltered.map((sprint) => {
        return (
          <option key={sprint._id} value={sprint._id}>
            Sprint {sprint.number}
          </option>
        );
      });
    }
  }
  renderUsers() {
    if (this.props.story) {
      let memberListFiltered = this.props.team.members;
      if (this.props.story.assigned) {
        memberListFiltered = this.props.team.members.filter((user) => {
          return user._id !== this.props.story.assigned._id;
        });
      }
      return memberListFiltered.map((user) => {
        return (
          <option key={user.userID} value={user._id}>
            {user.name}
          </option>
        );
      });
    }
  }
  renderSaveButton() {
      if (this.state.titleError || this.state.pointError){
      return (
        <button
          className={"btn btn-success btn-sm mb-2 textEditButton disabled-create disabled"}
        >
          Save
        </button>
      );
      } else{
        return (
          <button
            className={"btn btn-success btn-sm mb-2 textEditButton"}
            onClick={(e) => this.editStory(e, this.props.story._id)}
          >
            Save
          </button>
        );
      }
  }

  validateTitle(title) {
    this.setState({ titleHasChanged: true });

    if (title.length === 0 || title[0] === " ") {
      this.setState({
        titleError: true,
        title: title,
      });
    } else {
      this.setState({
        titleError: false,
        title: title
      });
    }
  }

  validatePoint(point) {
    this.setState({ pointsHasChanged: true });
    const digits_only = (string) =>
      [...string].every((c) => "0123456789".includes(c));

    if (!digits_only(point)) {
      this.setState({
        pointError: true,
        point: point,
      });
    } else {
      this.setState({
        pointError: false,
        point: point,
      });
    }
  }

  renderContentDetail() {
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
            className={`${this.state.titleError ? "inputError" : ""} detailInput mt-0 pl-2 py-2`}
            value={this.state.title}
            onChange={(e) => this.validateTitle(e.target.value)}
          />
        </div>
        <div id="assignedAndSprintDetail" className="mt-2">
          <div id="assignedDetail" className="assignedAndSprintDetail">
            <label>Assigned To</label>
            <select
              className="detailInput form-control form-control-lg pl-1"
              onChange={(e) => this.dropdownUser(e)}
            >
              <option
                selected
                value={
                  this.props.story.assigned
                    ? this.props.story.assigned._id
                    : null
                }
              >
                {this.props.story.assigned
                  ? this.props.story.assigned.name
                  : "Unassigned"}
              </option>
              {this.renderUsers()}
            </select>
          </div>
          <div id="sprintDetail" className="assignedAndSprintDetail">
            <label>Sprint</label>
            <select
              className="detailInput form-control form-control-lg pl-1"
              onChange={(e) => this.dropdownSprint(e)}
            >
              <option
                selected
                value={
                  this.props.story.sprint ? this.props.story.sprint._id : null
                }
              >
                {this.props.story.sprint
                  ? "Sprint " + this.props.story.sprint.number
                  : "Backlog"}
              </option>
              {this.renderSprints()}
            </select>
          </div>
        </div>
        <div id="stateDetail" className="mt-2">
          <label>Status</label>
          <select
            className="detailInput form-control form-control-lg pl-1"
            onChange={(e) => this.dropdownState(e)}
          >
            <option disabled selected value={this.props.story.status}>
              {this.props.story.status}
            </option>
            <option value="To-do">To-do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div id="pointsDetail" className="mt-2">
          <label>Points</label>
          <input
            className={`${this.state.pointError ? "inputError" : ""} detailInput mt-0 pl-2 py-2`}
            value={this.state.point}
            onChange={(e) => this.validatePoint(e.target.value)}
          />
        </div>
        <div id="descriptionDetail" className="my-2">
          <label>Description</label>
          <textarea
            className={"detailInput mt-0 pl-2 py-2"}
            value={
              this.state.description}
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

export default connect(mapStateToProps, { editUserStory })(StoryDetail);
