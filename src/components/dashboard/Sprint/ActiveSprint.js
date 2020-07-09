import React from "react";
import { connect } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";
import SprintModal from "./SprintModal";
import StatusGroup from "./StatusGroup";
import { getStories, getSprints, editUserStory } from "../../../actions";

import "../../../stylesheets/active.css";

class ActiveSprint extends React.Component {
  state = {
    activeSprint: null,
    activeStory: null,
    todo: [],
    inprogress: [],
    completed: [],
  };

  componentDidMount() {
    const currentSprint = this.getCurrentSprint();
    this.setState({ activeSprint: currentSprint });
    this.splitStories(currentSprint);
  }

  getCurrentSprint() {
    for (let i = 0; i < this.props.currentUser.team.sprints.length; i++) {
      if (this.props.currentUser.team.sprints[i].current) {
        return this.props.currentUser.team.sprints[i];
      }
    }
    return null;
  }

  splitStories(sprint) {
    if (sprint) {
      const todo = sprint.stories.filter((story) => {
        return story.status === "To-do";
      });
      const inprogress = sprint.stories.filter((story) => {
        return story.status === "In Progress";
      });
      const completed = sprint.stories.filter((story) => {
        return story.status === "Completed";
      });
      this.setState({ todo, inprogress, completed });
    }
  }

  handleDropEvent = (result) => {
    if (!result.destination) return;

    // Frontend change to the status groups
    const { source, destination } = result;
    let source_col = [];
    let newState = { ...this.state };
    let removed = null;
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "Completed") {
        source_col = [...this.state.completed];
        [removed] = source_col.splice(source.index, 1);
        source_col.splice(destination.index, 0, removed);
        newState.completed = source_col;
      } else if (source.droppableId === "In Progress") {
        source_col = [...this.state.inprogress];
        [removed] = source_col.splice(source.index, 1);
        source_col.splice(destination.index, 0, removed);
        newState.inprogress = source_col;
      } else {
        source_col = [...this.state.todo];
        [removed] = source_col.splice(source.index, 1);
        source_col.splice(destination.index, 0, removed);
        newState.todo = source_col;
      }
    } else {
      if (source.droppableId === "Completed") {
        source_col = [...this.state.completed];
        [removed] = source_col.splice(source.index, 1);
        newState.completed = source_col;
      } else if (source.droppableId === "In Progress") {
        source_col = [...this.state.inprogress];
        [removed] = source_col.splice(source.index, 1);
        newState.inprogress = source_col;
      } else {
        source_col = [...this.state.todo];
        [removed] = source_col.splice(source.index, 1);
        newState.todo = source_col;
      }

      let dest_col = [];
      if (destination.droppableId === "Completed") {
        dest_col = [...this.state.completed];
        dest_col.splice(destination.index, 0, removed);
        newState.completed = dest_col;
      } else if (destination.droppableId === "In Progress") {
        dest_col = [...this.state.inprogress];
        dest_col.splice(destination.index, 0, removed);
        newState.inprogress = dest_col;
      } else {
        dest_col = [...this.state.todo];
        dest_col.splice(destination.index, 0, removed);
        newState.todo = dest_col;
      }
    }
    this.setState({ ...newState });

    // Database call to edit the story's status
    let story = null;
    for (let i = 0; i < this.state.activeSprint.stories.length; i++) {
      if (this.state.activeSprint.stories[i]._id === result.draggableId) {
        story = this.state.activeSprint.stories[i];
        break;
      }
    }
    if (story && destination.droppableId !== source.droppableId) {
      const storyData = {
        ...story,
        title: story.title,
        description: story.description,
        status: result.destination.droppableId,
        assigned: story.assigned,
        point: story.point,
        sprint: story.sprint,
      };
      this.props.editUserStory(storyData, this.props.currentUser.team);
    }
  };

  changeStory = (story) => {
    this.setState({ activeStory: story });
  };
  render() {
    return (
      <>
        <div className="container-fluid">
          <div className="main-container active-sprint ml-4">
            <DragDropContext
              onDragEnd={(result) => this.handleDropEvent(result)}
            >
              <StatusGroup
                activeSprint={this.state.activeSprint}
                changeStory={this.changeStory}
                stories={this.state.todo}
                status={"To-do"}
              />
              <StatusGroup
                activeSprint={this.state.activeSprint}
                changeStory={this.changeStory}
                stories={this.state.inprogress}
                status={"In Progress"}
              />
              <StatusGroup
                activeSprint={this.state.activeSprint}
                changeStory={this.changeStory}
                stories={this.state.completed}
                status={"Completed"}
              />
            </DragDropContext>
          </div>
        </div>
        <SprintModal
          changeStory={this.changeStory}
          story={this.state.activeStory}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};
export default connect(mapStateToProps, {
  getSprints,
  getStories,
  editUserStory,
})(ActiveSprint);
