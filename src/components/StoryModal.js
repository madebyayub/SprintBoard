import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { createStory, getStories } from "../actions";

import "../stylesheets/storymodal.css";

Modal.setAppElement("#root");
class StoryModal extends React.Component {
  createUserStory(e) {
    e.preventDefault();
    const storyData = {
      title: this.storyTitle.value,
      user: this.props.currentUser,
      description: this.storyDescription.value,
      status: this.storyState.value,
      assigned: this.storyAssigned.value,
      points: this.storyPoint.value,
    };
    this.props.createStory(storyData, this.props.team);
    this.props.toggleModal();
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
            height: "90vh",
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
            ref={(select) => (this.storyAssigned = select)}
          >
            <option disabled selected>
              Assigned to
            </option>
            <option>Default select</option>
          </select>
          <input
            className="modalInput form-control py-4 mt-2"
            placeholder="State"
            ref={(input) => (this.storyState = input)}
          />
          <select
            className="modalSelect form-control form-control-lg mt-3"
            ref={(select) => (this.storyAssigned = select)}
          >
            <option disabled selected>
              Sprint
            </option>
            <option>Default select</option>
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
  };
};
export default connect(mapStateToProps, { createStory, getStories })(
  StoryModal
);
