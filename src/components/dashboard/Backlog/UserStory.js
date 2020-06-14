import React from "react";
import "../../../stylesheets/dashboard.css";

const UserStory = (props) => {
  return (
    <>
      <div
        className="story-title ml-1"
        onClick={() => props.changeStory(props.story)}
      >
        <i className="fa fa-bookmark mr-2 userStoryIcon" aria-hidden="true"></i>
        {props.story.title}
      </div>
      <button
        className="remove-story"
        onClick={() => props.deleteStory(props.story)}
      >
        <i class="fas fa-trash"></i>
      </button>
    </>
  );
};

export default UserStory;
