import React from "react";
import '../stylesheets/dropdown.css';

const Dropdown = (props) => {

    return (
        <div className={`${props.dropdownState ? "show-dropdown" : "hide-dropdown"}`} onClick={(e)=> e.stopPropagation()}>
            <div className="menu-items">
                <span>action 1</span>
            </div>
            <div className="menu-items">
                <span>action 2</span>
            </div>
        </div>
    );
}



export default Dropdown;