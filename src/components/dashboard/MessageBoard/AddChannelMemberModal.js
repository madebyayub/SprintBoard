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
  isInState(user) {
    for (let i = 0; i < this.state.addedMembers.length; i++) {
      if (this.state.addedMembers[i]._id === user._id) {
        return true;
      }
    }
    return false;
  }
  handleCloseModal = () => {
    this.setState({ addedMembers: [], name: "" });
    this.props.resetMemberResults();
    this.props.closeModal();
  };

  handleAddMember = (user) => {
    const isInState = this.isInState(user);
    const isMemberOf = this.isMemberOf(user);
    if (!isMemberOf && !isInState) {
      this.setState({ addedMembers: [...this.state.addedMembers, user] });
    } else if (isInState) {
      const newAddedMembers = this.state.addedMembers.filter((member) => {
        return member._id !== user._id;
      });
      this.setState({ addedMembers: newAddedMembers });
    }
  };

  handleNameChange = (e) => {
    if (e.target.value !== "") {
      this.props.searchMembers(e.target.value);
    } else {
      this.props.resetMemberResults();
    }
    this.setState({ name: e.target.value });
  };

  handleDoneAddingMembers = (e) => {
    this.props.addMembers(this.state.addedMembers, this.props.channel);
    this.handleCloseModal();
  };

  renderResults() {
    return this.props.memberSearchResults.map((user) => {
      return (
        <div className="userSearchResult" key={user._id}>
          <button className="py-1" onClick={() => this.handleAddMember(user)}>
            <img
              className="mx-2"
              src={user.profilePic}
              alt="member-searhc-profile"
            ></img>
            {user.name}
            {this.isInState(user) ? <span>Added</span> : ""}
            {this.isMemberOf(user) ? (
              <span>
                <i className="fas fa-check added-check"></i>
              </span>
            ) : (
              ""
            )}
          </button>
        </div>
      );
    });
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showAddMember ? true : false}
        onRequestClose={this.handleCloseModal}
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
              onClick={this.handleCloseModal}
            >
              Cancel
            </button>
            <h5 className="addMemberTitle">Add A Channel Member</h5>
            <button
              className="px-2"
              id="addMemberButton"
              onClick={this.handleDoneAddingMembers}
            >
              Add
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
