import React from "react";
import MakeTeam from "./MakeTeam";
import JoinTeam from "./JoinTeam";

class TeamChoices extends React.Component {
  state = { display: "main" };

  setDisplay = (display) => {
    this.setState({ display });
  };

  render() {
    if (this.state.display === "join") {
      return (
        <JoinTeam
          joinTeam={this.props.joinTeam}
          currentUser={this.props.currentUser}
          setDisplay={this.setDisplay}
        />
      );
    } else if (this.state.display === "make") {
      return (
        <MakeTeam
          currentUser={this.props.currentUser}
          createTeam={this.props.createTeam}
          setDisplay={this.setDisplay}
        />
      );
    } else {
      return (
        <>
          <div id="login-header" className="row">
            SprintBoard
          </div>
          <div id="website-description">
            Organizing, and completing sprints is now easier than ever.
          </div>
          <hr className="mt-3" />
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
          <hr className="mt-3" />
          <div id="home-page-profile" className="mb-3">
            <button className="p-2" onClick={this.props.onSignOutClick}>
              <img
                className="mr-2"
                src={this.props.currentUser.userPicture}
                alt="profile"
              ></img>
              Log out as {this.props.currentUser.userName}
            </button>
          </div>
        </>
      );
    }
  }
}

export default TeamChoices;
