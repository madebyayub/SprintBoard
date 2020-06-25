import React from "react";
import '../stylesheets/dropdown.css';

class Dropdown extends React.Component {
    removeUser = (e) =>  {
        e.stopPropagation();
        this.props.leaveTeamAction();
        this.props.showDropdown();
    }
    render (){
        return (
            <div className={`${this.props.dropdownState ? "show-dropdown" : "hide-dropdown"}`} onClick={this.removeUser }>
                <div className="menu-items">
                    <span>Leave</span>
                </div>
            </div>
        );
    }
}



export default Dropdown;