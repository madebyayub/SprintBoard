import React from "react";
import { connect } from "react-redux";
import Dropdown from "./dropdown";
import "../stylesheets/navbar.css";

class Navbar extends React.Component {
    container = React.createRef();
    state = { showNotification: false };

    componentDidMount() {
        document.addEventListener("mousedown",this.handleClickOutside);
    }
    componentWillUnmount() {
        document.addEventListener("mousedown",this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.container.current && !this.container.current.contains(event.target)){
            this.setState({showNotification: false});
        }
    }

  toggleDropdown = () => {
    this.setState((prevState) => ({
      showNotification: !prevState.showNotification,
    }));
  };

  render() {
    if (this.props.sidebar) {
      return (
        <div className="navbar fixed-top toggled" ref={this.container}>
          <label>user page name</label>
          <form className="form nav searchBar">
            <input
              type="text"
              className="form-control inputSearchBar"
              placeholder="Search"
            ></input>
          </form>
          <div>
            <button
              id="dropdownnoti"
              type="button"
              className="navBarbutton"
              onClick={this.toggleDropdown}>
              <i className="fa fa-bell-o navbarIcon"></i>
              <span id="notfication" className="badge">
                3
              </span>
            </button>
            <Dropdown dropdownState={this.state.showNotification} />
            <button className="navBarbutton">
              <i className="fa fa-user-circle-o navbarIcon"></i>
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar fixed-top">
          <label>user page name</label>
          <form className="form nav searchBar">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
            ></input>
          </form>
          <div ref={this.container}>
            <button
              id="dropdownnoti"
              type="button"
              className="navBarbutton"
              onClick={this.toggleDropdown}
            >
              <i className="fa fa-bell-o navbarIcon"></i>
              <span id="notfication" className="badge">
                3
              </span>
            </button>
            <Dropdown dropdownState={this.state.showNotification} />
            <button className="navBarbutton">
              <i className="fa fa-user-circle-o navbarIcon"></i>
            </button>
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

export default connect(mapStateToProps)(Navbar);
