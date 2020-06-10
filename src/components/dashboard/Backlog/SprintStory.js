import React from "react";
import "../../../stylesheets/sprintstory.css";

const SprintStory = () => {
    return (
        <div>
            <div className="dropdown sprintContainer m-2">
                <button className="sprintDropdown dropdown-toggle"> Sprint</button>
                <button className="createSprint"> Create</button>
            </div>

        </div>
    );
}
export default SprintStory;