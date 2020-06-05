import React from "react";
import { Link } from "react-router-dom";

import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar-short">
        <div className="actions">
          <button className="show-sidebar ml-0 px-3 py-2 mt-1">
            <i class="fas fa-door-open"></i>
          </button>
          <ul id="mainsidebar-list" className="pl-0 mt-5">
            <Link
              to="/backlog"
              className={`nav-button py-3 ${
                this.props.activeTab === "Backlog" ? "active" : ""
              } pl-4`}
            >
              <i className="fas fa-th-list mr-3"></i>
            </Link>
            <Link
              to="/active"
              className={`nav-button py-3 ${
                this.props.activeTab === "Active" ? "active" : ""
              } pl-4`}
            >
              <i className="fas fa-running mr-3"></i>
            </Link>
            <Link
              to="/board"
              className={`nav-button py-3 ${
                this.props.activeTab === "Board" ? "active" : ""
              } pl-4`}
            >
              <i className="fas fa-comment-dots mr-3"></i>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
