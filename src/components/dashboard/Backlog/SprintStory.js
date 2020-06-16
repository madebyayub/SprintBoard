import React from "react";
import "../../../stylesheets/sprintstory.css";

               /* <button className="sprintDropdown dropdown-toggle"> Sprint</button>*/
const SprintStory = () => {
    return (
        <div>
            <div className="dropdown sprintContainer m-2">
                <select
                class="dropdown-toggle sprintDropdown"
                >
                <option disabled selected>
                Current Sprint
                </option>
                <option>Default select</option>
                </select>
                <button className="createSprint"> Create</button>
            </div>

        </div>
    );
}
export default SprintStory;