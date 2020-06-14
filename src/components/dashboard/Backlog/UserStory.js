import React from "react";
import "../../../stylesheets/backlog.css";

const UserStory = (props) => {
  return (
    <div
      className="story-container-backlog ml-2 mr-0 px-2 py-2"
      onClick={() => props.changeStory(props.story)}
    >
      <div className="story-title ml-1">
        <i className="fa fa-bookmark mr-2 userStoryIcon" aria-hidden="true"></i>
        {props.story.title}
      </div>
      <button
        className="remove-story"
        onClick={() => props.deleteStory(props.story)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default UserStory;
