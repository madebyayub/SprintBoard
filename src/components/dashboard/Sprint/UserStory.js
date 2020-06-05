import React from "react";

const UserStory = (props) => {
  return (
    <div className="story-container mx-2 mb-1 px-2 py-2">
      <div className="story-title ml-1">First Story</div>
      <div className="row ml-1">
        <div className="col-8 story-description pl-0">Story Description</div>
        <div className="col-4 user-assigned">
          <i class="fas fa-user-circle float-right"></i>
        </div>
      </div>
    </div>
  );
};

export default UserStory;
