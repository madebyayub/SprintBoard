import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { getStories, kickTeam, getSprints, leaveTeam } from "../actions";

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
  leaveTeamAction = (user, id, leave) => {
    this.props.leaveTeam(
      id,
      user.name,
      this.props.currentUser.team.name,
      leave
    );
  };
  storiesCreatedAndAssigned(user) {
    let created_count = 0;
    let assigned_count = 0;
    for (let i = 0; i < this.props.currentUser.team.stories.length; i++) {
      if (
        this.props.currentUser.team.stories[i].assigned &&
        this.props.currentUser.team.stories[i].assigned._id === user._id
      ) {
        assigned_count += 1;
      }
      if (this.props.currentUser.team.stories[i].author._id === user._id) {
        created_count += 1;
      }
    }
    return { created: created_count, assigned: assigned_count };
  }
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
      const count = this.storiesCreatedAndAssigned(member);
      console.log(member.userID);
      console.log(this.props.currentUser.userId);
      return (
        <tr
          className={`member-row ${
            member.userID === this.props.currentUser.userId ? "current" : ""
          }`}
        >
          <td className="profile-picture-member">
            <img src={member.profilePic} alt="member-profile"></img>
          </td>
          <td className="leader-member">
            {member.leader ? <i className="fas fa-crown"></i> : <></>}
          </td>
          <td className="name-member">{member.name}</td>
          <td className="created-member">{count.created}</td>
          <td className="assigned-member">{count.assigned}</td>
          <td className="actions-member">
            <button
              className="px-2 py-0"
              onClick={
                member.userID === this.props.currentUser.userId
                  ? () =>
                      this.leaveTeamAction(
                        this.props.currentUser,
                        this.props.currentUser.userId
                      )
                  : () =>
                      this.props.kickTeam(
                        member.userID,
                        member.name,
                        this.props.currentUser.team.name
                      )
              }
            >
              {member.userID === this.props.currentUser.userId ? (
                <i className="fas fa-door-open"></i>
              ) : this.props.currentUser.leader ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                <></>
              )}
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
                Leave
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

  render() {
    if (this.props.currentUser.team.members) {
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
        </Modal>
      );
    } else {
      return <></>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, {
  getStories,
  getSprints,
  leaveTeam,
  kickTeam,
})(TeamModal);
