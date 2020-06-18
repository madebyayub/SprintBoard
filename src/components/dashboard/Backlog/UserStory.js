import React from "react";
import "../../../stylesheets/backlog.css";

const UserStory = (props) => {
  return (
    <tr className="story-row" onClick={() => props.changeStory(props.story)}>
      <td className="title-col">{props.story.title}</td>
      <td>
        <img
          className="story-row-profile mr-2"
          src={props.story.author.profilePic}
          alt="author-profile"
        ></img>
        {props.story.author.name}
      </td>
      <td>{props.story.status}</td>
      <td>{props.story.points}</td>
      <td>{props.story.assigned}</td>
      <td>
        <button
          className="remove-story px-2"
          onClick={(e) => props.deleteStory(e, props.story)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default UserStory;
