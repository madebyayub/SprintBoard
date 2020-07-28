import React from "react";
import { connect } from "react-redux";
import ActiveSprint from "./Sprint/ActiveSprint";
import MessageBoard from "./MessageBoard/MessageBoard";
import Navbar from "../Navbar";
import Backlog from "./Backlog/Backlog";
import Sidebar from "../Sidebar";
import { fetchTeam, updateUser, signIn, signOut } from "../../actions";
import history from "../../history";

class Dashboard extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "1081400884742-fm0dpemaradabmeih7rnn31on8a2lmjn.apps.googleusercontent.com",
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
  onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      const currentUser = this.auth.currentUser.get();
      if (!this.props.isSignedIn) {
        this.props.signIn(
          currentUser.getId(),
          currentUser.getBasicProfile().getImageUrl(),
          currentUser.getBasicProfile().getName()
        );
        this.props.updateUser(
          currentUser.getId(),
          currentUser.getBasicProfile().getImageUrl(),
          currentUser.getBasicProfile().getName()
        );
      }
      if (this.auth.isSignedIn.get()) {
        this.props.fetchTeam(currentUser.getId());
      } else {
        history.push("/");
      }
    } else {
      this.props.signOut();
    }
  };
  render() {
    if (
      this.props.isSignedIn &&
      this.props.hasTeam &&
      this.props.currentUser.team
    ) {
      switch (this.props.match.params.dashboard) {
        case "backlog":
          return (
            <>
              <Navbar auth={this.auth} activeTab="Backlog" />
              <Sidebar activeTab="Backlog" />
              <Backlog />
            </>
          );
        case "active":
          return (
            <>
              <Navbar auth={this.auth} activeTab="Active" />
              <Sidebar activeTab="Active" />
              <ActiveSprint currentUser={this.props.currentUser} />
            </>
          );
        case "board":
          return (
            <>
              <Navbar auth={this.auth} activeTab="Board" />
              <Sidebar activeTab="Board" />
              <MessageBoard />
            </>
          );
        default:
          return <div>Page not found - Error 404</div>;
      }
    } else {
      return <></>;
    }
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
export default connect(mapStateToProps, {
  fetchTeam,
  updateUser,
  signIn,
  signOut,
})(Dashboard);
