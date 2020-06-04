import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { hideSidebar, showSidebar } from "../actions";
import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  state = { activeTab: "Backlog" };

  changeTab(newTab) {
    this.setState({ activeTab: newTab });
  }

  componentDidMount() {
    this.props.hideSidebar();
  }
  render() {
    if (this.props.sidebar) {
      return (
        <div id="sidebar" className="toggled">
          <div className="header px-3 pt-3">
            <button
              className="hide-sidebar px-3 py-2"
              onClick={this.props.hideSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div id="group-header" className="mx-5 my-5 py-3">
            <span id="group-name">Group Name</span>
            <span id="group-header-dropdown" className="ml-4 px-2 py-1">
              <i className="fas fa-caret-down"></i>
            </span>
          </div>
          <div id="sidebar-nav" className="mx-0 mt-5">
            <div className="navbar-button-header mx-4">DASHBOARDS</div>
            <ul id="mainsidebar-list" className="pl-0 mt-3">
              <Link
                to="/backlog"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Backlog" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Backlog")}
              >
                <i className="fas fa-th-list mr-3"></i>
                <span className="nav-label">Backlog</span>
              </Link>
              <Link
                to="/active"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Active" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Active")}
              >
                <i className="fas fa-running mr-3"></i>
                <span className="nav-label">Active Sprint</span>
              </Link>
              <Link
                to="/board"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Board" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Board")}
              >
                <i className="fas fa-comment-dots mr-3"></i>
                <span className="nav-label">Message Board</span>
              </Link>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div id="sidebar-short">
          <div className="actions">
            <button
              className="show-sidebar ml-0 px-3 py-2 mt-1"
              onClick={this.props.showSidebar}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
            <ul id="mainsidebar-list" className="pl-0 mt-5">
              <Link
                to="/backlog"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Backlog" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Backlog")}
              >
                <i className="fas fa-th-list mr-3"></i>
              </Link>
              <Link
                to="/active"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Active" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Active")}
              >
                <i className="fas fa-running mr-3"></i>
              </Link>
              <Link
                to="/board"
                className={`nav-button py-3 ${
                  this.state.activeTab === "Board" ? "active" : ""
                } pl-4`}
                onClick={() => this.changeTab("Board")}
              >
                <i className="fas fa-comment-dots mr-3"></i>
              </Link>
            </ul>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    sidebar: state.showSidebar.showSidebar,
  };
};

export default connect(mapStateToProps, { hideSidebar, showSidebar })(Sidebar);
