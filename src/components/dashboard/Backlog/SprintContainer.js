import React from "react";
import "../../../stylesheets/sprintstory.css";

/* <button className="sprintDropdown dropdown-toggle"> Sprint</button>*/
class SprintContainer extends React.Component {
  renderSprints () {
    return this.props.currentUser.team.sprints.map((sprint) => {
      return <option key={sprint.number}>Sprint {sprint.number}</option>;
    });
  }

  render(){
    return (
      <div>
        <div className="dropdown sprintContainer m-2">
          <select className="dropdown-toggle sprintDropdown ml-4">
            <option disabled selected>
              Current Sprint
            </option>
            {this.renderSprints()}
          </select>
        </div>
      </div>
    );
  };
};
export default SprintContainer;
