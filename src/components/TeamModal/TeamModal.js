import React from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import MemberView from "./MemberView";
import SprintView from "./SprintView";
import { notifyError, notifyWarn } from "../../utils/utils";
import {
  getStories,
  kickTeam,
  getSprints,
  leaveTeam,
  editTeamName,
  deleteSprint,
} from "../../actions";
import ServerAPI from "../../api/ServerAPI";

import "../../stylesheets/teammodal.css";

class TeamModal extends React.Component {
  state = {
    currentTab: 0,
    editTitle: false,
    teamTitle: this.props.currentUser.team.name,
  };
  componentDidMount() {
    this.props.getStories(
      this.props.currentUser.team._id,
      this.props.currentUser.team.stories
    );
    this.props.getSprints(this.props.currentUser.team._id);
  }
  handleTitleChange = (e) => {
    this.setState({ teamTitle: e.target.value });
  };

  handleChangeTeamName = async (e) => {
    e.preventDefault();
    if (this.state.teamTitle.length === 0) {
      notifyWarn("Team name cannot be empty");
    } else if (this.state.teamTitle.length > 25) {
      notifyWarn("Team name cannot be more than 15 characters");
    } else {
      const response = await ServerAPI.get(`/team/${this.state.teamTitle}`);
      if (response.data.length > 0) {
        notifyError("Team name already exists");
      } else {
        this.props.editTeamName(
          this.props.currentUser.team,
          this.state.teamTitle
        );
        this.setState({ editTitle: false });
      }
    }
  };

  leaveTeamAction = (id) => {
    this.props.leaveTeam(id, this.props.currentUser.team);
  };

  renderTitleState() {
    if (this.props.currentUser.leader && this.state.editTitle) {
      return (
        <div id="TeamTitleContainer" className="ml-2">
          <form onSubmit={this.handleChangeTeamName}>
            <input
              autoFocus
              type="text"
              value={this.state.teamTitle}
              onChange={(e) => this.handleTitleChange(e)}
              class="form-control form-control-lg"
            />
          </form>
          <button
            id="TeamTitleEditCancel"
            onClick={() => this.setState({ editTitle: false })}
          >
            <i class="fas fa-backspace"></i>
          </button>
        </div>
      );
    } else {
      return (
        <div id="TeamTitleContainer" className="ml-2">
          <h3 id="TeamTitle" className="ml-4">
            {this.props.currentUser.team.name}
          </h3>
          {this.props.currentUser.leader ? (
            <button
              id="TeamTitleEdit"
              onClick={() => this.setState({ editTitle: true })}
              className="ml-2 mb-1"
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
          ) : (
            <></>
          )}
        </div>
      );
    }
  }
  renderTitle() {
    return (
      <div id="TeamModalTitle">
        {this.renderTitleState()}
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
          {this.state.currentTab === 0 ? (
            <MemberView
              kickTeam={this.props.kickTeam}
              leaveTeamAction={this.leaveTeamAction}
              currentUser={this.props.currentUser}
            />
          ) : (
            <SprintView
              deleteSprint={this.props.deleteSprint}
              currentUser={this.props.currentUser}
            />
          )}
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
  editTeamName,
  deleteSprint,
})(TeamModal);
