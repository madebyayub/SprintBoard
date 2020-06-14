import React from "react";
import "../../../stylesheets/dashboard.css";

const UserStory = (props) => {
  return (
    <>
      <div
        className="story-title ml-1"
        key={props.key}
      >
        <i className="fa fa-bookmark mr-2 userStoryIcon" aria-hidden="true"></i>
        {props.title}
      </div>
    </>
  );
};

export default UserStory;
