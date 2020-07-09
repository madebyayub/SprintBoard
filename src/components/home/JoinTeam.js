import React from "react";
import { Spinner } from "react-bootstrap";
import ServerAPI from "../../api/ServerAPI";

class JoinTeam extends React.Component {
  state = { results: [], searchInput: "", searching: false };

  joinATeam(teamname) {
    this.props.joinTeam(
      this.props.currentUser.userId,
      this.props.currentUser.userName,
      this.props.currentUser.userPicture,
      teamname
    );
  }

  handleSearchInputChange = (e) => {
    this.setState({ searchInput: e.target.value });
  };

  async searchTeam(e) {
    e.preventDefault();
    try {
      await ServerAPI.get(`/team/${this.state.searchInput}`).then((res) => {
        this.setState({ results: res.data, searchInput: "" });
      });
      this.setState({ searching: true });
    } catch (e) {
      console.log(e);
    }
  }

  renderResults() {
    if (this.state.loading) {
      return <Spinner animation="border" />;
    } else if (this.state.results.length > 0) {
      return this.state.results.map((team) => {
        return (
          <div className="search-result" key={team.name}>
            <button
              className="btn btn-success btn-sm"
              onClick={() => this.joinATeam(team.name)}
            >
              Join
            </button>
            <div id="result-name">{team.name}</div>
            <div id="result-members">{team.members.length} members</div>
            <hr />
          </div>
        );
      });
    } else {
      return (
        <div className="search-result none">
          <i className="fas fa-clipboard"></i>
          <div id="no-result-label">There are no teams with that name</div>
        </div>
      );
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
        <div id="team-option-header" className="row">
          Join A Team
        </div>
        <form className="mt-1" onSubmit={(e) => this.searchTeam(e)}>
          <div className="form-group" id="join-team-form">
            <label id="team-name-label" htmlFor="teamname">
              Enter A Team Name
            </label>
            <input
              value={this.state.searchInput}
              autoComplete="off"
              className="form-control form-control-lg"
              id="team-name-input"
              placeholder="Team #432"
              onChange={this.handleSearchInputChange}
            />
          </div>
        </form>
        <label id="team-results" className="mb-3">
          Results
        </label>
        <div id="search-result-list">{this.renderResults()}</div>
      </>
    );
  }
}

export default JoinTeam;
