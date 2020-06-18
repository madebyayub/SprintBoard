import React from "react";
import "../../../stylesheets/sprintstory.css";

/* <button className="sprintDropdown dropdown-toggle"> Sprint</button>*/
const SprintContainer = () => {
  return (
    <div>
      <div className="dropdown sprintContainer m-2">
        <select class="dropdown-toggle sprintDropdown">
          <option disabled selected>
            Current Sprint
          </option>
          <option>Default select</option>
        </select>
      </div>
    </div>
  );
};
export default SprintContainer;
