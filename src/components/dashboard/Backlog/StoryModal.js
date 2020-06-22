import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createStory, getSprints } from "../../../actions";

import "../../../stylesheets/storymodal.css";

Modal.setAppElement("#root");
class StoryModal extends React.Component {
  state = { 
    sprintValue: null,
    assignedUser: null, 
    stateValue: "To-do", 
    titleError: false,
    pointError: false,
  };

  dropdownValue = (e) => {
    this.setState({ sprintValue: e.target.value });
  };
  dropdownUser = (e) => {
    this.setState({ assignedUser: e.target.value });
  };
  dropdownState = (e) => {
    this.setState({ stateValue: e.target.value });
  };

  validateTitle (title) {
      if (title.length === 0 || title[0] === ' ') {
        console.log("title has a error");
        this.setState({
          titleError: true
        })
      }
      else{
        this.setState({
          titleError: false
        })
      }
  } 

  validatePoint (point) {
    const digits_only = string => [...string].every(c => '0123456789'.includes(c));

    if (! digits_only(point)) {
      console.log("Invalid type in point. Point should be a number.");
      this.setState({
        pointError: true
      })
    }
    else{
      this.setState({
        pointError: false
      })
    } 
  }

  createUserStory(e) {
    e.preventDefault();
    const storyData = {
      title: this.storyTitle.value,
      user: this.props.currentUser,
      description: this.storyDescription.value,
      status: this.state.stateValue,
      assigned: this.state.assignedUser,
      sprint: this.state.sprintValue,
      points: this.storyPoint.value,
    };
    this.props.createStory(storyData, this.props.team);
    this.props.toggleModal();
    this.setState({
      sprintValue: null,
      assignedUser: null,
      stateValue: "To-do",
    });
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

  closeModal = () => {
    this.setState({
      titleError: false,
      pointError: false,
    });
    console.log(this.props);
    this.props.toggleModal();
  }

  renderCreateStory () {
    if (this.state.titleError || this.state.pointError){
      return (<button
        className="btn btn-success disabled-create disabled"
        >
        Create New Story
        </button>);
    }
    else {
      return (<button
      className="btn btn-success"
      onClick={(e) => this.createUserStory(e)}
      >
      Create New Story
      </button>);
    }
  }

  render() {
    return (
      <Modal
        isOpen={this.props.openModal}
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
              onClick={() => this.closeModal()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <div className="modalTitle mt-2">
            <input
              ref={(input) => (this.storyTitle = input)}
              className= {`${this.state.titleError ? "inputError" : ""} modalInput py-4 form-control`}
              placeholder="Title"
              onChange={() => this.validateTitle(this.storyTitle.value)}
            />
          </div>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownUser(e)}
          >
            <option selected value="null">
              Unassigned
            </option>
            {this.renderUsers()}
          </select>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownState(e)}
          >
            <option selected value="To-do">
              To-do
            </option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            className="modalSelect form-control form-control-lg mt-3"
            onChange={(e) => this.dropdownValue(e)}
          >
            <option selected value="null">
              Backlog
            </option>
            {this.renderSprints()}
          </select>
          <input
            className={`${this.state.pointError ? "inputError" : ""} modalInput py-4 mt-2 form-control`}
            placeholder="Points"
            ref={(input) => (this.storyPoint = input)}
            onChange= {() => this.validatePoint(this.storyPoint.value) }
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
            {this.renderCreateStory()}
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
