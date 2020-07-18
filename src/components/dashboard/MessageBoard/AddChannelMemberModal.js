import React, { Component } from "react";
import Modal from "react-modal";
import "../../../stylesheets/addchannelmembermodal.css";

class AddChannelMemberModal extends Component {
  state = { name: "", addedMembers: [] };

  isMemberOf(user) {
    for (let i = 0; i < this.props.channel.members.length; i++) {
      if (this.props.channel.members[i]._id === user._id) {
        return true;
      }
    }
    return false;
  }

  handleNameChange = (e) => {
    if (e.target.value !== "") {
      this.props.searchMembers(e.target.value);
    } else {
      this.props.resetMemberResults();
    }
    this.setState({ name: e.target.value });
  };

  renderResults() {
    return this.props.memberSearchResults.map((user) => {
      return (
        <div className="userSearchResult">
          <button className="py-1">
            <img
              className="mx-2"
              src={user.profilePic}
              alt="member-searhc-profile"
            ></img>
            {user.name}
            {this.isMemberOf(user) ? <span>Joined</span> : ""}
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showAddMember ? true : false}
        onRequestClose={() => this.props.closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
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
              placeholder="Add a member"
              value={this.state.name}
              onChange={(e) => this.handleNameChange(e)}
            />
          </div>
          <div className="memberResultsContainer pt-2">
            <label>Users</label>
            <div className="memberResults">{this.renderResults()}</div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default AddChannelMemberModal;
