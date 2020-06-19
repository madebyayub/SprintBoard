import React from "react";
import UserStory from "../Backlog/UserStory";
import StoryDetail from "../Backlog/StoryDetail";
import "../../../stylesheets/sprintstory.css";

/* <button className="sprintDropdown dropdown-toggle"> Sprint</button>*/
class SprintContainer extends React.Component {
  state = {selectedSprint: null, activeStory: null, currentSprintVal: null};

  sprintValue = (e) => {
    this.setState({selectedSprint: e.target.value});
  };

  renderSprints () {
    return this.props.currentUser.team.sprints.map((sprint) => {
      return <option key={sprint._id} value={sprint._id}>Sprint {sprint.number}</option>;
    });
  };

  /*
    Change: This function runs when a user clicks on the
            story within the backlog container and changes
            the activeStory state so the correct story
            is displayed within the edit slide in view.

    Delete: This function deletes a story from the team's
            story list by calling the action creator that 
            requests to delete that story from the database. 
  */
  changeStory = (story) => {
    this.setState({ activeStory: story });
  };
  
  deleteStory = (e, story) => {
    if (this.state.activeStory && story._id === this.state.activeStory._id) {
      this.changeStory(null);
    }
    e.stopPropagation();
    this.props.deleteStory(story);
  };


  renderSprintStories () {
    if (this.props.currentUser.team.stories !== undefined && this.props.currentUser.team.stories.length > 0){
      if (this.state.selectedSprint != null){
        let sprintstories = this.props.currentUser.team.stories.map((sprintStory)=>{
          if(sprintStory.sprint !== null){
            if (sprintStory.sprint === this.state.selectedSprint){
              return (
                <React.Fragment key={sprintStory._id}>
                  <UserStory
                    addStoryToSprint={this.props.addStoryToSprint}
                    removeStoryFromSprint={this.props.removeStoryFromSprint}
                    story={sprintStory}
                    deleteStory={this.deleteStory}
                    changeStory={this.changeStory}
                  />
                </React.Fragment>
              );
            }
            else{
              return null;
            }
          }
        });
         // Filter out all the null elements
         sprintstories = sprintstories.filter((elem) => {
        return elem != null;
        });
        console.log(sprintstories);
        // If all stories have a sprint, display the empty message.
        if (sprintstories.length > 0) {
          return sprintstories;
        }
      } else if (this.state.selectedSprint == null && this.props.currentUser.team.sprints.length > 0 ){
        let currentSprint = this.props.currentUser.team.sprints.map((sprint)=>{
          if(sprint.current === true){
            return sprint;
          }
        });
        currentSprint = currentSprint.filter((elem) => {
          return elem != null;
        });
        this.setState({selectedSprint: currentSprint[0]._id, currentSprintVal: currentSprint[0]._id});
        console.log(currentSprint);
        // If the the team's stories are empty, display the empty message.
      } else if (this.props.currentUser.team.stories !== undefined) {
        return (
          <tr className="empty-row">
            <td></td>
            <td>Your team has no stories in the sprint</td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
            <td> </td>
          </tr>
        );
      } else {
        return <></>;
      }
    }
  }

  render(){
    return (
      <div className="mb-2" id="backlog-list-container">
        <div className="dropdown sprintContainer m-2">
          <select className="dropdown-toggle sprintDropdown ml-3" onChange={(e) => this.sprintValue(e)}>
            <option selected value={this.state.currentSprintVal}>
              Current Sprint
            </option>
            {this.renderSprints()}
          </select>
        </div>
        <table className="table table-borderless mt-2 mb-0">
          <thead>
            <tr id="backlog-list-header">
              <th className="check-col" scole="col"></th>
              <th className="title-col" scope="col">
                Title
              </th>
              <th className="person-col" scope="col">
                Made By
              </th>
              <th className="status-col" scope="col">
                Status
              </th>
              <th className="points-col" scope="col">
                Points
              </th>
              <th className="person-col" scope="col">
                Assigned To
              </th>
              <th className="actions-col" scope="col"></th>
            </tr>
          </thead>
          <tbody>{this.renderSprintStories()}</tbody>
        </table>
        <label id="numStories" className="mr-3 pt-2">
          {this.props.currentUser
            ? this.props.currentUser.team.stories.length
            : ""}{" "}
          User Stories
        </label>
        <StoryDetail
          changeStory={this.changeStory}
          story={this.state.activeStory}
        />
      </div>
    );
  };
};
export default SprintContainer;
