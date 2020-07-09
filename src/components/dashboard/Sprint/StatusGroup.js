import React from "react";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

class StatusGroup extends React.Component {
  renderIcon() {
    if (this.props.status === "To-do") {
      return <i className="fas fa-map-marker mr-2"></i>;
    } else if (this.props.status === "In Progress") {
      return <i className="fas fa-sync-alt mr-2"></i>;
    } else {
      return <i className="fas fa-check-circle mr-2"></i>;
    }
  }

  renderStories() {
    if (!this.props.activeSprint) {
      return <div id="noCurrentSprintMessage">No Active Sprint</div>;
    } else {
      return this.props.stories.map((story, index) => {
        return (
          <Draggable key={story._id} draggableId={story._id} index={index}>
            {(provided, snapshot) => {
              return (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`story-container mx-2 my-1 px-2 py-2`}
                  style={{
                    userSelect: "none",
                    backgroundColor: snapshot.isDragging
                      ? "white"
                      : "rgba(255, 255, 255, 0.1)",
                    opacity: snapshot.isDragging ? 0.5 : 1,
                    ...provided.draggableProps.style,
                  }}
                  onClick={() => this.props.changeStory(story)}
                >
                  <div className="col-10 story-title p-0">{story.title}</div>
                  <div className="row ml-0">
                    <div className="col-10 story-description pl-0">
                      {story.description}
                    </div>
                    <div className="col-2 user-assigned">
                      <img
                        className="story-profile-pic"
                        src={
                          story.assigned
                            ? story.assigned.profilePic
                            : "https://ccivr.com/wp-content/uploads/2019/07/empty-profile.png"
                        }
                        alt="assigned profile"
                      ></img>
                    </div>
                  </div>
                </div>
              );
            }}
          </Draggable>
        );
      });
    }
  }
  render() {
    return (
      <>
        <div className="status ml-1 mt-3">
          <div className="status-label mt-2 ml-3 mb-3">
            {this.renderIcon()}
            {this.props.status}
          </div>
          <Droppable droppableId={this.props.status}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    boxShadow: snapshot.isDraggingOver
                      ? "inset 0 0 6px rgb(26, 115, 232)"
                      : "none",
                  }}
                  className="status-story-container py-2"
                >
                  {this.renderStories()}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    team: state.auth.user.team,
  };
};
export default connect(mapStateToProps)(StatusGroup);
