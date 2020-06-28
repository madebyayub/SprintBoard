import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { getStories, getSprints, leaveTeam } from "../actions";

import "../stylesheets/teammodal.css";

class TeamModal extends React.Component {
  state = { currentTab: 0 };
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
    this.props.getSprints(this.props.currentUser.team._id);
  }
  leaveTeamAction = () => {
    this.props.leaveTeam(
      this.props.currentUser.userId,
      this.props.currentUser.name,
      this.props.currentUser.team.name
    );
  };
  renderTitle() {
    return (
      <div id="TeamModalTitle">
        <h3 id="TeamTitle" className="ml-4">
          {this.props.currentUser.team.name}
        </h3>
        <button
          id="closeTeamModal"
          className="px-3 py-2"
          onClick={() => this.props.closeModal()}
        >
          <i className="fa fa-times" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
  renderModalNavigation() {
    return (
      <div id="TeamModalNavigation">
        <button
          className={`modalNavigationTab ${
            this.state.currentTab === 0 ? "active" : null
          }`}
          onClick={() => this.setState({ currentTab: 0 })}
        >
          Members
        </button>
        <button
          className={`modalNavigationTab ${
            this.state.currentTab === 1 ? "active" : null
          }`}
          onClick={() => this.setState({ currentTab: 1 })}
        >
          Sprints
        </button>
      </div>
    );
  }
  renderMembers() {
    return this.props.currentUser.team.members.map((member) => {
      return (
        <tr
          className={`member-row ${
            member.userID === this.props.currentUser.userId ? "current" : ""
          }`}
        >
          <td className="profile-picture-member">
            <img src={member.profilePic}></img>
          </td>
          <td className="leader-member">
            <i className="fas fa-crown"></i>
          </td>
          <td className="name-member">{member.name}</td>
          <td className="created-member">2</td>
          <td className="assigned-member">2</td>
          <td className="actions-member">
            <button className="px-2 py-0">
              <i className="fas fa-times-circle"></i>
            </button>
          </td>
        </tr>
      );
    });
  }
  renderMemberView() {
    return (
      <div id="MemberListContainer">
        <table className="table table-borderless mt-2 mb-0">
          <thead>
            <tr id="member-list-header">
              <th className="picture-col" scope="col">
                Icon
              </th>
              <th className="leader-col" scole="col"></th>
              <th className="name-col" scope="col">
                Name
              </th>
              <th className="created-stories-col" scope="col">
                Created
              </th>
              <th className="assigned-stories-col" scope="col">
                Assigned
              </th>
              <th className="kick-col" scope="col">
                Kick
              </th>
            </tr>
          </thead>
          <tbody>{this.renderMembers()}</tbody>
        </table>
      </div>
    );
  }
  renderSprintsView() {
    return <div>Sprints</div>;
  }
  renderLeaveButton() {
    return (
      <div id="LeaveTeamSection">
        <button onClick={this.leaveTeamAction}>Leave Team</button>
      </div>
    );
  }
  render() {
    return (
      <Modal
        isOpen={this.props.showLeaveModal ? true : false}
        onRequestClose={() => this.props.closeModal()}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 1031,
          },
          content: {
            padding: "0",
            border: "none",
            borderRadius: "5px",
            boxShadow: "0 0 15px rgba(0,0,0,0.5)",
            backgroundColor: " rgba(240,240,240,1)",
            width: "50%",
            minWidth: "300px",
            height: "93vh",
            margin: "auto",
          },
        }}
      >
        {this.renderTitle()}
        {this.renderModalNavigation()}
        {this.state.currentTab === 0
          ? this.renderMemberView()
          : this.renderSprintsView()}
        {this.renderLeaveButton()}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { getStories, getSprints, leaveTeam })(
  TeamModal
);
