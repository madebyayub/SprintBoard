import React from "react";
import {connect} from "react-redux";
import {showDropdown, hideDropdown} from "../actions";
import '../stylesheets/dropdown.css';

class Dropdown extends React.Component {
    render(){
        console.log('in dropdown');
        return (
            <div className={`${this.props.dropdownState ? "dropdown1" : "dropdown"}`} >
                <div className="menu-items">
                    <span>action 1</span>
                </div>
                <div className="menu-items">
                    <span>action 2</span>
                </div>
            </div>
        );
    };
}

const mapStateToProps = (state) =>{
    return {
        dropdown: state.ShowDropdown.showDropdown
    };
}

export default connect (mapStateToProps, {showDropdown,hideDropdown}) (Dropdown);