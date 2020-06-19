import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createStory, getSprints } from "../actions";

import "../stylesheets/storymodal.css";

Modal.setAppElement("#root");
class StoryModal extends React.Component {
  state = { sprintValue: null, assignedUser: null };

  dropdownValue = (e) => {
    this.setState({ sprintValue: e.target.value });
  };
  dropdownUser = (e) => {
    this.setState({ assignedUser: e.target.value });
  };

  createUserStory(e) {
    console.log(this.state.sprintValue);
    e.preventDefault();
    const storyData = {
      title: this.storyTitle.value,
      user: this.props.currentUser,
      description: this.storyDescription.value,
      status: this.storyState.value,
      assigned: this.state.assignedUser,
      sprint: this.state.sprintValue,
      points: this.storyPoint.value,
    };

    this.props.createStory(storyData, this.props.team);
    this.props.toggleModal();
    this.setState({ sprintValue: null, assignedUser: null });
  }

  renderSprints() {
    if (this.props.openModal) {
      return this.props.team.sprints.map((sprint) => {
        return (
          <option key={sprint._id} value={sprint.number}>
            Sprint {sprint.number}
          </option>
        );
      });
    }
  }
  renderUsers() {
    if (this.props.openModal) {
      return this.props.team.members.map((user) => {
        return (
          <option key={user.userID} value={user.userID}>
            {user.name}
          </option>
        );
      });
    }
  }

  componentDidUpdate(prevState) {
    if (this.props.openModal && !prevState.openModal) {
      this.props.getSprints(this.props.team._id);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.openModal}
        onRequestClose={this.props.toggleModal}
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
            width: "40%",
            minWidth: "300px",
            height: "93vh",
            margin: "auto",
          },
        }}
      >
        <div className="ModalContainer">
          <div id="ModalHeader">
            <label id="ModalTitle">Add a New User Story</label>
            <button
              id="closeModal"
              className="px-3 py-2"
              onClick={this.props.toggleModal}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="modalTitle mt-2">
            <input
              ref={(input) => (this.storyTitle = input)}
              className="modalInput py-4 form-control"
              placeholder="Title"
            />
          </div>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownUser(e)}
          >
            <option disabled selected value="null">
              Unassigned
            </option>
            {this.renderUsers()}
          </select>
          <input
            className="modalInput form-control py-4 mt-2"
            placeholder="State"
            ref={(input) => (this.storyState = input)}
          />
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownValue(e)}
          >
            <option disabled selected value="null">
              Backlog
            </option>
            {this.renderSprints()}
          </select>
          <input
            className="form-control modalInput py-4 mt-2"
            placeholder="Points"
            ref={(input) => (this.storyPoint = input)}
          />
          <div className="ModalDescription mt-3">
            <textarea
              ref={(input) => (this.storyDescription = input)}
              placeholder="Description"
              className="form-control modalTextArea"
              rows="5"
            ></textarea>
          </div>
          <div className="modalActions mt-4 mb-1">
            <button
              className="btn btn-success"
              onClick={(e) => this.createUserStory(e)}
            >
              Create New Story
            </button>
          </div>
        </div>
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
export default connect(mapStateToProps, { createStory, getSprints })(
  StoryModal
);
