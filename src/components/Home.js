import React from "react";
import { connect } from "react-redux";
import GoogleAuth from "./GoogleAuth";
import { searchTeamName, resetResults, createTeam, joinTeam } from "../actions";

import "../stylesheets/home.css";
class Home extends React.Component {
  state = { display: "main" };

  setDisplay(display) {
    this.setState({ display });
    if (display === "main") {
      this.props.resetResults();
    }
  }
  makeTeam(e) {
    e.preventDefault();
    this.props.createTeam(
      this.props.currentUser.userId,
      this.props.currentUser.userName,
      this.props.currentUser.userPicture,
      this.makeInput.value
    );
  }
  joinATeam(e, teamname) {
    e.preventDefault();
    this.props.joinTeam(
      this.props.currentUser.userId,
      this.props.currentUser.userName,
      this.props.currentUser.userPicture,
      teamname
    );
    this.props.resetResults();
  }
  searchTeam(e) {
    e.preventDefault();
    this.props.searchTeamName(this.joinInput.value);
  }
  renderCorrectStatus() {
    if (this.props.isSignedIn) {
      return (
        <>
          <div id="login-status" className="mt-3 row">
            You are currently logged in but not apart of a team
          </div>
        </>
      );
    } else {
      return (
        <>
          <div id="login-status" className="mt-3 row">
            You are currently not logged in
          </div>
          <div id="profile-picture" className="row">
            <span id="not-signed-in">
              <i className="fas fa-question-circle"></i>
            </span>
          </div>
        </>
      );
    }
  }
  renderTeamOptions() {
    if (this.props.isSignedIn) {
      return (
        <>
          <div
            className="team-choice join py-3"
            onClick={() => this.setDisplay("join")}
          >
            <div className="choice-label">Join A Team</div>
          </div>
          <div
            className="team-choice make mt-2 py-3"
            onClick={() => this.setDisplay("make")}
          >
            <div className="choice-label">Make A Team</div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
  renderResults() {
    if (this.props.joinTeamResults.length > 0) {
      return this.props.joinTeamResults.map((team) => {
        return (
          <div className="search-result" key={team.name}>
            <button
              className="btn btn-success btn-sm"
              onClick={(e) => this.joinATeam(e, team.name)}
            >
              Join
            </button>
            <div id="result-name">{team.name}</div>
            <div id="result-members">{team.members.length} members</div>
          </div>
        );
      });
    } else {
      return (
        <div className="search-result none mt-5">
          <i className="fas fa-clipboard"></i>
          <div id="no-result-label">There are no teams with that name</div>
        </div>
      );
    }
  }
  renderDisplay() {
    if (this.state.display === "make") {
      return (
        <>
          <div
            id="back-button"
            className="py-3 px-4"
            onClick={() => this.setDisplay("main")}
          >
            <i className="fas fa-arrow-left"></i>
          </div>
          <div id="team-option-header" className="row mt-5">
            Make A Team
          </div>
          <form className="mt-3">
            <div className="form-group">
              <label id="team-name-label" htmlFor="teamname">
                Enter A Team Name
              </label>
              <input
                autoComplete="off"
                className="form-control form-control-lg"
                id="team-name-input"
                placeholder="Team #432"
                ref={(input) => (this.makeInput = input)}
              />
            </div>
            <label id="status-label">{this.props.status}</label>
            <button
              type="submit"
              className="btn btn-primary mt-4"
              id="create-team"
              onClick={(e) => this.makeTeam(e)}
            >
              Submit
            </button>
          </form>
        </>
      );
    } else if (this.state.display === "join") {
      return (
        <>
          <div
            id="back-button"
            className="py-3 px-4"
            onClick={() => this.setDisplay("main")}
          >
            <i className="fas fa-arrow-left"></i>
          </div>
          <div id="team-option-header" className="row">
            Join A Team
          </div>
          <form className="mt-1" onSubmit={(e) => this.searchTeam(e)}>
            <div className="form-group" id="join-team-form">
              <label id="team-name-label" htmlFor="teamname">
                Enter A Team Name
              </label>
              <input
                autoComplete="off"
                className="form-control form-control-lg"
                id="team-name-input"
                placeholder="Team #432"
                ref={(input) => (this.joinInput = input)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-1"
              id="search-join-team"
            >
              <i className="fas fa-search"></i>
            </button>
          </form>
          <label id="team-results" className="mb-3">
            Results
          </label>
          <div id="search-result-list">{this.renderResults()}</div>
        </>
      );
    } else {
      return (
        <>
          <div id="login-header" className="row">
            SprintBoard
          </div>
          {this.renderCorrectStatus()}
          <div id="google-auth" className="row mt-3">
            <GoogleAuth page="home" />
          </div>
          <div id="team-choices" className="mt-4">
            {this.renderTeamOptions()}
          </div>
        </>
      );
    }
  }
  render() {
    return (
      <>
        <div id="home" className="container-fluid">
          <div id="login-container" className="mt-3">
            <div id="login-content" className="container my-4">
              {this.renderDisplay()}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    hasTeam: state.auth.hasTeam,
    currentUser: {
      userId: state.auth.user.userId,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePicture,
    },
    joinTeamResults: state.home.joinTeam.searchResults,
    status: state.home.makeTeam.status,
  };
};

export default connect(mapStateToProps, {
  searchTeamName,
  resetResults,
  createTeam,
  joinTeam,
})(Home);
