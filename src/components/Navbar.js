import React from "react";
import { connect } from "react-redux";
import Dropdown from "./Dropdown.js";

import history from "../history";
import { signOut } from "../actions";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
  container = React.createRef();
  state = { showNotification: false };

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
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
    } else {
      this.props.signOut();
    }
  };
  onSignOutClick = () => {
    this.auth.signOut();
    history.push("/");
  };
  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({ showNotification: false });
    }
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      showNotification: !prevState.showNotification,
    }));
  };
  render() {
    const img = this.props.currentUser.userPicture;
    return (
      <div className="navbar fixed-top">
        <div className="page-label">
          <span id="main-page">SprintBoard / </span>
          <span id="active-tab-page">{this.props.activeTab}</span>
        </div>
        <div id="team-label">
          <span>TEAM </span>
          <span>{this.props.currentUser.team.name.toUpperCase()}</span>
        </div>
        <div ref={this.container}>
          <button
            id="dropdownnoti"
            type="button"
            className="navBarbutton"
            onClick={this.toggleDropdown}
          >
            <i className="fa fa-bell-o navbarIcon"></i>
            <span id="notfication" className="badge">
              3
            </span>
          </button>
          <Dropdown dropdownState={this.state.showNotification} />
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
export default connect(mapStateToProps, { signOut })(Navbar);
