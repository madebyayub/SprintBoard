import React from "react";
import { connect } from "react-redux";
import { signOut, leaveTeam } from "../actions";
import TeamModal from "./TeamModal/TeamModal";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  container = React.createRef();
  state = { showLeaveModal: false };

  onSignOutClick = () => {
    this.props.auth.signOut();
  };

  showDropdown = () => {
    this.setState((prevState) => ({
      showLeaveModal: !prevState.showLeaveModal,
    }));
  };
  leaveTeamAction = () => {
    this.props.leaveTeam(
      this.props.currentUser.userID,
      this.props.currentUser.userName,
      this.props.currentUser.team.name
    );
  };
  closeTeamModal = () => {
    this.setState({ showLeaveModal: false });
  };
  render() {
    const img = this.props.currentUser.userPicture;
    return (
      <>
        <div className="navbar fixed-top">
          <div id="navbar-labels">
            <div className="navbar-left ml-2" id="page-label">
              <span id="main-page">SprintBoard</span>
            </div>
            <div className="navbar-left ml-5" id="team-label">
              <button
                id="team-btn"
                className="py-2 px-3"
                onClick={this.showDropdown}
              >
                <i className="fas fa-users mr-2"></i>
                {this.props.currentUser.team.name}
                <i className="fas fa-sort-down ml-2"></i>
              </button>
            </div>
          </div>
          <div id="main-page-profile">
            <button className="p-2" onClick={this.onSignOutClick}>
              <img
                className="mr-2"
                src={this.props.currentUser.userPicture}
                alt="profile"
              ></img>
              Log out
            </button>
          </div>
        </div>
        <TeamModal
          closeModal={this.closeTeamModal}
          showLeaveModal={this.state.showLeaveModal}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    hasTeam: state.auth.hasTeam,
    currentUser: {
      team: state.auth.user.team,
      userID: state.auth.user.userID,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePic,
    },
  };
};
export default connect(mapStateToProps, { signOut, leaveTeam })(Navbar);
