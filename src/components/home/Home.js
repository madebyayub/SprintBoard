import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Login from "./Login";
import TeamChoices from "./TeamChoices";
import ServerAPI from "../../api/ServerAPI";
import "../../stylesheets/home.css";

import {
  signIn,
  signOut,
  createTeam,
  joinTeam,
  initialFetchTeam,
} from "../../actions";

class Home extends React.Component {
  state = { logging_in: false };
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1081400884742-gfbkgjc37s6t38qbtgt936jpfmf62ekt.apps.googleusercontent.com",
          scope: "email",
          ux_mode: "redirect",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }
  onAuthChange = async (isSignedIn) => {
    if (isSignedIn) {
      const currentUser = this.auth.currentUser.get();
      this.props.signIn(
        currentUser.getId(),
        currentUser.getBasicProfile().getImageUrl(),
        currentUser.getBasicProfile().getName()
      );
      try {
        await ServerAPI.get(`/user/team/${currentUser.getId()}`).then((res) => {
          this.props.initialFetchTeam(
            res.data.team,
            res.data.team ? true : false
          );
        });
        this.setState({ logging_in: true });
      } catch (e) {
        console.log(e);
      }
    } else {
      this.props.signOut();
    }
  };
  onSignInClick = () => {
    this.auth.signIn();
  };
  onSignOutClick = () => {
    this.auth.signOut();
  };
  renderDisplay() {
    if (!this.props.isSignedIn) {
      return <Login onSignInClick={this.onSignInClick} />;
    } else if (this.props.isSignedIn && !this.props.hasTeam) {
      if (this.state.logging_in) {
        return (
          <TeamChoices
            createTeam={this.props.createTeam}
            joinTeam={this.props.joinTeam}
            onSignOutClick={this.onSignOutClick}
            currentUser={this.props.currentUser}
          />
        );
      } else {
        return (
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        );
      }
    }
  }

  render() {
    if (this.props.currentUser && this.props.hasTeam) {
      return <Redirect to="/backlog" />;
    }
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
      userID: state.auth.user.userID,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePic,
    },
  };
};

export default connect(mapStateToProps, {
  signIn,
  signOut,
  initialFetchTeam,
  joinTeam,
  createTeam,
})(Home);
