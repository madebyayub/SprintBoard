import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-short">
        <div id="actions">
          <ul id="mainsidebar-list" className="pl-0 mt-5">
            <Link
              to="/backlog"
              className={`nav-button py-3 ${
                this.props.activeTab === "Backlog" ? "active" : ""
              }`}
              title="Backlog"
            >
              <i className="fas fa-th-list"></i>
              <div className="nav-label">Backlog</div>
            </Link>
            <Link
              to="/active"
              className={`nav-button py-3 ${
                this.props.activeTab === "Active" ? "active" : ""
              }`}
              title="Active Sprint"
            >
              <i className="fas fa-running"></i>
              <div className="nav-label">Active Sprint</div>
            </Link>
            <Link
              to="/board"
              className={`nav-button py-3 ${
                this.props.activeTab === "Board" ? "active" : ""
              }`}
              title="Message Board"
            >
              <i className="fas fa-comment-dots"></i>
              <div className="nav-label">Message Board</div>
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
      userID: state.auth.user.userID,
      userName: state.auth.user.name,
      userPicture: state.auth.user.profilePic,
    },
  };
};

export default connect(mapStateToProps)(Sidebar);
