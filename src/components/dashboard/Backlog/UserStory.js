import React from "react";
import "../../../stylesheets/dashboard.css";

const UserStory = (props) => {
  return (
    <div className="story-container mx-2 mb-1 px-2 py-2" key={props.key}>
      <div className="story-title ml-1" key={props.key} onClick={()=> console.log("this div was clicked")}>
        <i className="fa fa-bookmark mr-2 userStoryIcon" aria-hidden="true"></i>
        {props.title}
      </div>
    </div>
  );
};

export default UserStory;
