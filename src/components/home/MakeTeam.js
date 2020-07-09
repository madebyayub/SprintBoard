import React from "react";
import history from "../../history";
import ServerAPI from "../../api/ServerAPI";

class MakeTeam extends React.Component {
  state = { status: "", newTeamName: "" };
  handleInputChange = (e) => {
    this.setState({ newTeamName: e.target.value });
  };

  async makeTeam(e) {
    e.preventDefault();
    if (this.state.newTeamName.length === 0) {
      this.setState({ status: "Team name cannot be empty" });
    } else if (this.state.newTeamName.length > 25) {
      this.setState({ status: "Team name cannot be more than 25 characters" });
    } else {
      const response = await ServerAPI({
        method: "post",
        url: `/team`,
        data: {
          userID: this.props.currentUser.userId,
          username: this.props.currentUser.userName,
          userpicture: this.props.currentUser.userPicture,
          teamname: this.state.newTeamName,
        },
      });
      if (response.data.response === "Succesfully saved new team") {
        history.push("/backlog");
      } else {
        this.setState({ status: response.data.response });
      }
    }
  }

  render() {
    return (
      <>
        <div
          id="back-button"
          className="py-3 px-4"
          onClick={() => this.props.setDisplay("main")}
        >
          <i className="fas fa-arrow-left"></i>
        </div>
        <div id="team-option-header" className="row mt-3">
          Make A Team
        </div>
        <form className="mt-3">
          <div className="form-group">
            <label id="team-name-label" htmlFor="teamname">
              Enter A Team Name
            </label>
            <input
              value={this.state.newTeamName}
              autoComplete="off"
              className="form-control form-control-lg"
              id="team-name-input"
              placeholder="Team #432"
              onChange={this.handleInputChange}
            />
          </div>
          <label id="status-label">{this.state.status}</label>
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
  }
}

export default MakeTeam;
