import React from "react";
import { connect } from "react-redux";
import GoogleAuth from "./GoogleAuth";
import "../stylesheets/home.css";
class Home extends React.Component {
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
          <div className="team-choice join py-3">
            <div className="choice-label">Join A Team</div>
          </div>
          <div className="team-choice make mt-2 py-3">
            <div className="choice-label">Make A Team</div>
          </div>
        </>
      );
    } else {
      return null;
    }
  }
  render() {
    return (
      <>
        <div id="home" className="container-fluid">
          <div id="login-container" className="mt-3">
            <div id="login-content" className="container my-4">
              <div id="login-header" className="row">
                SprintBoard
              </div>
              {this.renderCorrectStatus()}
              <div id="google-auth" className="row mt-3">
                <GoogleAuth />
              </div>
              <div id="team-choices" className="mt-4">
                {this.renderTeamOptions()}
              </div>
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
    currentUserId: state.auth.currentUserId,
  };
};

export default connect(mapStateToProps)(Home);
