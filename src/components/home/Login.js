import React from "react";

class Login extends React.Component {
  render() {
    return (
      <>
        <div id="login-header" className="row">
          SprintBoard
        </div>
        <div id="website-description">
          Organizing, and completing sprints is now easier than ever.
        </div>
        <hr className="mt-5" />
        <div id="login-status" className="mt-5 mb-4 row">
          You are currently not logged in
        </div>
        <div id="google-auth">
          <button
            className="google-login not-logged-in pl-3"
            onClick={this.props.onSignInClick}
          >
            <span id="google-logo-container" className="py-1 px-1">
              <i className="fab fa-google"></i>
            </span>
            <div id="sign-in" className="pr-5 pl-4 py-2">
              Sign in with Google
            </div>
          </button>
        </div>
      </>
    );
  }
}

export default Login;
