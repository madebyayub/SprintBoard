import React, { Component } from "react";
import Modal from "react-modal";
import "../../../stylesheets/addchannelmembermodal.css";

class AddChannelMemberModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showAddMember ? true : false}
        onRequestClose={() => this.props.closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1031,
          },
          content: {
            padding: "0",
            border: "none",
            borderRadius: "1px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            backgroundColor: " rgba(255,255,255,1)",
            width: "30%",
            height: "65vh",
            margin: "auto",
          },
        }}
      >
        <div className="addTeamMemberContainer">
          <div className="addTeamMemberHeader py-1">
            <button
              className="px-2"
              id="closeButton"
              onClick={() => this.props.closeModal()}
            >
              Cancel
            </button>
            <h7 className="addMemberTitle">Add A Channel Member</h7>
            <button className="px-2" id="addMemberButton">
              Done
            </button>
          </div>
          <div className="addMemberSearchContainer">
            <input
              className="memberInput form-control"
              placeholder="e.g. general"
              value=""
              onChange={(e) => this.handleCreateChange(e)}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddChannelMemberModal;
