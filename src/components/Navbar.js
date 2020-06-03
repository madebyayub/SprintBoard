import React from "react"
import { connect } from "react-redux";
import Dropdown from "./dropdown";
import '../stylesheets/navbar.css';
import '../stylesheets/dropdown.css';
import {showDropdown, hideDropdown} from "../actions";

class Navbar extends React.Component{
    state = { showNotification:false};
    
    toggleDropdown = () => {
        this.setState(prevState => ({ showNotification: !prevState.showNotification}));
    };

    render () {
        const {showNotification} = this.state;
        if(this.props.sidebar){
            return (
                <div className="navbar fixed-top toggled">
                    <a className="navbar-item">user page name</a>
                    <form className="form nav searchBar">  
                        <input type="text" className="form-control inputSearchBar" placeholder="Search" ></input>
                    </form>
                    <div>
                        <button id="dropdownnoti" type="button" className="navBarbutton" onClick={this.toggleDropdown}>
                            <i className="fa fa-bell-o navbarIcon"></i>
                            <span id="notfication" className="badge">3</span>
                        </button>
                        <div className={`${showNotification ? "show-dropdown" : "hide-dropdown"}`} >
                            <div className="menu-items">
                                <span>action 1</span>
                            </div>
                            <div className="menu-items">
                                <span>action 2</span>
                            </div>
                        </div>
                    <button className="navBarbutton">
                        <i className="fa fa-user-circle-o navbarIcon"></i> 
                    </button>
                    </div>
                </div>
            );
        }else {
            return (
                <div className="navbar fixed-top">
                    <a className="navbar-item">user page name</a>
                    <form className="form nav searchBar">  
                        <input type="text" className="form-control" placeholder="Search" ></input>
                    </form>
                    <div>
                        <button id="dropdownnoti" type="button" className="navBarbutton" onClick={this.toggleDropdown}>
                            <i className="fa fa-bell-o navbarIcon"></i> 
                            <span id="notfication" className="badge">3</span>
                        </button>
                        <div className={`${showNotification ? "show-dropdown" : "hide-dropdown"}`} >
                            <div className="menu-items">
                                <span>action 1</span>
                            </div>
                            <div className="menu-items">
                                <span>action 2</span>
                            </div>
                        </div>
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

export default connect(mapStateToProps) (Navbar);