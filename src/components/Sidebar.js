import React from "react";

import "../stylesheets/sidebar.css";

class Sidebar extends React.Component {
  render() {
    return (
      <div id="sidebar" className="toggled">
        <div className="header px-3 pt-3">
          <button className="hide-sidebar px-3 py-2">
            <i className="fas fa-bars"></i>
          </button>
        </div>
        <hr />
        <div id="sidebar-nav" className="mt-5">
          <button className="nav-button mt-3 py-3 toggled">Backlog</button>
          <button className="nav-button mt-3 py-3">Active Sprint</button>
          <button className="nav-button mt-3 py-3">Message Board</button>
        </div>
      </div>
    );
  }
}

export default Sidebar;
