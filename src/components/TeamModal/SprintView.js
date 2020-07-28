import React from "react";

class SprintView extends React.Component {
  sprintStatusCount(sprint) {
    let inprogress = 0,
      completed = 0,
      todo = 0;
    for (let i = 0; i < sprint.stories.length; i++) {
      if (sprint.stories[i].status === "In Progress") {
        inprogress += 1;
      } else if (sprint.stories[i].status === "Completed") {
        completed += 1;
      } else if (sprint.stories[i].status === "To-do") {
        todo += 1;
      }
    }
    return { inprogress, todo, completed };
  }

  renderSprints() {
    return this.props.currentUser.team.sprints.map((sprint) => {
      const count = this.sprintStatusCount(sprint);
      return (
        <tr className={`member-row ${sprint.current ? "current" : ""}`}>
          <td className="profile-picture-member">Sprint {sprint.number}</td>
          <td className="nextsprint-col">
            {sprint.current ? (
              <i className="fas fa-star active-sprint-star"></i>
            ) : (
              <>
                {this.props.currentUser.leader ? (
                  <i
                    className="fas fa-play next-sprint"
                    onClick={() =>
                      this.props.setCurrentSprint(
                        this.props.currentUser.team._id,
                        sprint
                      )
                    }
                  ></i>
                ) : (
                  <></>
                )}
              </>
            )}
          </td>
          <td className="name-member sprintview">{count.inprogress}</td>
          <td className="created-member">{count.todo}</td>
          <td className="assigned-member">{count.completed}</td>
          <td className="actions-member">
            {this.props.currentUser.leader ? (
              <button
                className="px-2 py-0"
                onClick={() =>
                  this.props.deleteSprint(this.props.currentUser.team, sprint)
                }
              >
                <i className="fas fa-trash"></i>
              </button>
            ) : (
              <></>
            )}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div id="MemberListContainer">
        <table className="table table-borderless mt-2 mb-0">
          <thead>
            <tr id="member-list-header">
              <th className="picture-col" scope="col">
                Sprint
              </th>
              <th className="nextsprint-col" scole="col">
                Active Sprint
              </th>
              <th className="name-col sprintview" scope="col">
                In Progress
              </th>
              <th className="created-stories-col sprintview" scope="col">
                To-Do
              </th>
              <th className="assigned-stories-col sprintview" scope="col">
                Completed
              </th>
              <th className="kick-col" scope="col">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>{this.renderSprints()}</tbody>
        </table>
      </div>
    );
  }
}

export default SprintView;
