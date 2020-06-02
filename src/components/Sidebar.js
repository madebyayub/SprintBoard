import React from "react";
import { connect } from "react-redux";

import { hideSidebar, showSidebar } from "../actions";
import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  componentDidMount() {
    this.props.hideSidebar();
  }
  render() {
    if (this.props.sidebar) {
      return (
        <div id="sidebar" className="toggled">
          <div className="header px-3 pt-3">
            <span>SprintBoard</span>
            <button
              className="hide-sidebar px-3 py-2"
              onClick={this.props.hideSidebar}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <hr />
          <div id="group-header" className="mx-5 my-5 py-3">
            <span id="group-name">Group Name</span>
            <span id="group-header-dropdown" className="ml-4 px-2 py-1">
              <i className="fas fa-caret-down"></i>
            </span>
          </div>
          <div id="sidebar-nav" className="mx-0 mt-5">
            <div className="navbar-button-header mx-4">DASHBOARDS</div>
            <ul id="mainsidebar-list" className="pl-0 mt-3">
              <li className="nav-button active py-3 pl-4">
                <i className="fas fa-th-list mr-3"></i>Backlog
              </li>
              <li className="nav-button py-3 pl-4">
                <i className="fas fa-running mr-3"></i>Active Sprint
              </li>
              <li className="nav-button py-3 pl-4">
                <i className="fas fa-comment-dots mr-3"></i>Message Board
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div id="sidebar-short">
          <div className="actions">
            <button
              className="show-sidebar ml-0 px-3 py-2 mt-3"
              onClick={this.props.showSidebar}
            >
              <i className="fas fa-arrow-right"></i>
            </button>
            <ul id="mainsidebar-list" className="pl-0 mt-5">
              <li className="nav-button active py-3 pl-4">
                <i className="fas fa-th-list mr-3"></i>
              </li>
              <li className="nav-button py-3 pl-4">
                <i className="fas fa-running mr-3"></i>
              </li>
              <li className="nav-button py-3 pl-4">
                <i className="fas fa-comment-dots mr-3"></i>
              </li>
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
