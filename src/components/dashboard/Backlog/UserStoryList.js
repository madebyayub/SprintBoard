import React from "react";
import UserStory from "./UserStory";
import SprintStory from "./SprintStory";

const UserStoryList = (props) => {
    if (props.activeTab === 'Backlog'){
        return (
            <div>
            <UserStory title="backlog story one" />
            <UserStory title="backlog story two"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            <UserStory title="backlog story three"/>
            </div>
        );
    }  
    else {
        return (
            <div>
            <SprintStory />
            <div>
                <UserStory title="sprint story one"/>
                <UserStory title="sprint story two"/>
                <UserStory title="sprint story three"/>
            </div>
            </div>
        );
    } 
};

export default UserStoryList;