import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { leaveTeam } from "../actions";
import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-short">
        <div className="actions">
          <button
            className="show-sidebar ml-0 px-3 py-2 mt-1"
            onClick={() =>
              this.props.leaveTeam(
                this.props.currentUser.userId,
                this.props.currentUser.userName,
                this.props.currentUser.team.name
              )
            }
          >
            <i className="fas fa-door-open"></i>
          </button>
          <ul id="mainsidebar-list" className="pl-0 mt-5">
            <Link
              to="/backlog"
              className={`nav-button py-3 ${
                this.props.activeTab === "Backlog" ? "active" : ""
              } pl-4`}
              title="Backlog"
            >
              <i className="fas fa-th-list mr-3"></i>
            </Link>
            <Link
              to="/active"
              className={`nav-button py-3 ${
                this.props.activeTab === "Active" ? "active" : ""
              } pl-4`}
              title="Active Sprint"
            >
              <i className="fas fa-running mr-3"></i>
            </Link>
            <Link
              to="/board"
              className={`nav-button py-3 ${
                this.props.activeTab === "Board" ? "active" : ""
              } pl-4`}
              title="Message Board"
            >
              <i className="fas fa-comment-dots mr-3"></i>
            </Link>
          </ul>
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

export default connect(mapStateToProps, { leaveTeam })(Sidebar);
