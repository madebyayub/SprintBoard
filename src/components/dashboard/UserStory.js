import React from "react";
import "../../stylesheets/userstory.css";

const UserStory =(props) => {
    return (
    <div className="userStoryContainer mt-2 ml-2">
        <div className="py-2 ml-2">
        <a href="#">{props.storytitle}</a>
        </div>
    </div>
    );
}   

export default UserStory;