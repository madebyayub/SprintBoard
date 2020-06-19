import React from "react";
import { connect } from "react-redux";
import { signOut, leaveTeam } from "../actions";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  container = React.createRef();
  state = { showLeaveModal: false };

  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1081400884742-gfbkgjc37s6t38qbtgt936jpfmf62ekt.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
    } else {
      this.props.signOut();
    }
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };

  render() {
    const img = this.props.currentUser.userPicture;
    return (
      <div className="navbar fixed-top">
        <div id="navbar-labels">
          <div className="navbar-left ml-2" id="page-label">
            <span id="main-page">SprintBoard</span>
          </div>
          <div className="navbar-left ml-5" id="team-label">
            <button id="team-btn" className="py-2 px-3">
              <i className="fas fa-users mr-2"></i>
              {this.props.currentUser.team.name}
              <i className="fas fa-sort-down ml-2"></i>
            </button>
          </div>
        </div>
        <div id="profileIcon">
          <button
            id="profileIconBtn"
            className="google-login logged-in p-1"
            onClick={this.onSignOutClick}
          >
            <img id="profile-logo-icon-nav" src={img} alt="Profile" />
            <span>Log out</span>
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    hasTeam: state.auth.hasTeam,
    currentUser: {
      team: state.auth.user.team,
      userId: state.auth.user.userId,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePicture,
    },
  };
};
export default connect(mapStateToProps, { signOut, leaveTeam })(Navbar);
