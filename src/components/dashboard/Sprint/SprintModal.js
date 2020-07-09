import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { editUserStory, getSprints } from "../../../actions";

Modal.setAppElement("#root");
class SprintModal extends React.Component {
  state = {
    title: "",
    point: "",
    description: "",
    assigned: null,
    sprint: null,
    titleHasChanged: false,
    titleError: false,
    pointError: false,
    editState: true,
  };

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

  dropdownValue = (e) => {
    this.setState({ sprint: e.target.value });
  };
  dropdownUser = (e) => {
    this.setState({ assigned: e.target.value });
  };

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
        title: title,
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

  editStory(e, story) {
    e.preventDefault();
    const storyData = {
      ...story,
      title: this.state.title,
      description: this.state.description,
      status: this.state.status,
      assigned:
        this.state.assigned === "Unassigned" ? null : this.state.assigned,
      point: this.state.point,
      sprint: this.state.sprint,
    };

    this.props.editUserStory(storyData, this.props.team);
    this.setState({
      titleError: false,
      pointError: false,
    });
    this.closeModal();
  }

  closeModal = () => {
    this.setState({
      titleHasChanged: false,
      pointsHasChanged: false,
      titleError: false,
      pointError: false,
    });
    this.props.changeStory(null);
  };

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
    if (this.state.titleError || this.state.pointError) {
      return (
        <button
          className={
            "btn btn-success btn-sm mb-2 textEditButton disabled-create disabled"
          }
        >
          Save
        </button>
      );
    } else {
      return (
        <button
          className={"btn btn-success btn-sm mb-2 textEditButton"}
          onClick={(e) => this.editStory(e, this.props.story)}
        >
          Save
        </button>
      );
    }
  }
  renderEditModal() {
    if (!this.props.story) {
      return <></>;
    } else {
      return (
        <div className="ModalContainer">
          <div id="ModalHeader">
            <div id="ActiveModalTitle">
              <label id="ModalTitle">Edit Story</label>
            </div>
            <button
              id="closeModal"
              className="px-3 py-2"
              onClick={() => this.closeModal()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <label id="ModalAuthor">Made by {this.props.story.author.name}</label>
          <div className="modalTitle mt-0">
            <input
              className={`${
                this.state.titleError ? "inputErrorModals" : ""
              } modalInput py-4 form-control`}
              value={this.state.title}
              onChange={(e) => this.validateTitle(e.target.value)}
            />
          </div>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownUser(e)}
          >
            <option
              selected
              value={
                this.props.story.assigned ? this.props.story.assigned._id : null
              }
            >
              {this.props.story.assigned
                ? this.props.story.assigned.name
                : "Unassigned"}
            </option>
            {this.renderUsers()}
            {this.props.story.assigned ? (
              <option value={null}>Unassigned</option>
            ) : (
              <></>
            )}
          </select>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownState(e)}
          >
            <option value="To-do">To-do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownValue(e)}
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
          <input
            className={`${
              this.state.pointError ? "inputErrorModals" : ""
            } modalInput py-4 mt-2 form-control`}
            value={this.state.point}
            placeholder="Points"
            onChange={(e) => this.validatePoint(e.target.value)}
          />
          <div className="ModalDescription mt-3">
            <textarea
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
              className="form-control modalTextArea"
              rows="5"
            ></textarea>
          </div>
          <div className="modalActions mt-4 mb-1">
            {this.renderSaveButton()}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.story ? true : false}
        onRequestClose={() => this.closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1031,
          },
          content: {
            border: "none",
            borderRadius: "10px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            backgroundColor: " rgba(255,255,255,0.9)",
            width: "50%",
            minWidth: "300px",
            height: "93vh",
            margin: "auto",
          },
        }}
      >
        {this.renderEditModal()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.userId,
    team: state.auth.user.team,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { editUserStory, getSprints })(
  SprintModal
);
