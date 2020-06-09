import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
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
      const currentUser = this.auth.currentUser.get();
      this.props.signIn(
        currentUser.getId(),
        currentUser.getBasicProfile().getImageUrl(),
        currentUser.getBasicProfile().getName()
      );
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
  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      const img = this.props.currentUserPicture;
      return (
        <div id="profile-pic-container" className="row">
          <button
            className="google-login logged-in p-1"
            onClick={this.onSignOutClick}
          >
            <img id="profile-logo" src={img} alt="Profile"></img>
          </button>
        </div>
      );
    } else {
      return (
        <button
          className="google-login not-logged-in pl-3"
          onClick={this.onSignInClick}
        >
          <span id="google-logo-container" className="py-2 px-1">
            <img
              id="google-logo"
              src="http://pngimg.com/uploads/google/google_PNG19635.png"
              alt="Profile"
            ></img>
          </span>
          <div id="sign-in" className="pr-5 pl-4 py-3">
            Sign in with Google
          </div>
        </button>
      );
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.user.userId,
    currentUserPicture: state.auth.user.profilePicture,
    currentUserName: state.auth.user.name,
  };
};
export default connect(mapStateToProps, {
  signIn,
  signOut,
})(GoogleAuth);
