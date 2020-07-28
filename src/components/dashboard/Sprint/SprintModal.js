import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { editUserStory, getSprints } from "../../../actions";

Modal.setAppElement("#root");
class SprintModal extends React.Component {
  closeModal = () => {
    this.setState({
      titleHasChanged: false,
      pointsHasChanged: false,
      titleError: false,
      pointError: false,
    });
    this.props.changeStory(null);
  };

  renderModal() {
    if (!this.props.story) {
      return <></>;
    } else {
      return (
        <div className="ModalContainer">
          <div id="ModalHeader">
            <div id="ActiveModalTitle">
              <label id="ModalTitle">{this.props.story.title}</label>
            </div>
            <button
              id="closeModal"
              className="px-3 py-2"
              onClick={() => this.closeModal()}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
          <label id="ModalAuthor" className="author-active">
            {this.props.story.assigned
              ? `Assigned to ${this.props.story.assigned.name}`
              : "Unassigned"}
            {" - "}
            {this.props.story.points + " points"}
          </label>
          <p>{this.props.story.status}</p>
          <p>{this.props.story.description}</p>
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
            width: "25%",
            minWidth: "300px",
            height: "55vh",
            margin: "auto",
          },
        }}
      >
        {this.renderModal()}
      </Modal>
    );
  }
}

export default SprintModal;
