import React from "react";

class MemberView extends React.Component {
  storiesCreatedAndAssigned(user) {
    let created_count = 0;
    let assigned_count = 0;
    for (let i = 0; i < this.props.currentUser.team.stories.length; i++) {
      if (
        this.props.currentUser.team.stories[i].assigned &&
        this.props.currentUser.team.stories[i].assigned._id === user._id
      ) {
        assigned_count += 1;
      }
      if (this.props.currentUser.team.stories[i].author._id === user._id) {
        created_count += 1;
      }
    }
    return { created: created_count, assigned: assigned_count };
  }
  renderMembers() {
    return this.props.currentUser.team.members.map((member) => {
      const count = this.storiesCreatedAndAssigned(member);
      return (
        <tr
          className={`member-row ${
            member.userID === this.props.currentUser.userId ? "current" : ""
          }`}
        >
          <td className="profile-picture-member">
            <img src={member.profilePic} alt="member-profile"></img>
          </td>
          <td className="leader-member">
            {member.leader ? <i className="fas fa-crown"></i> : <></>}
          </td>
          <td className="name-member">{member.name}</td>
          <td className="created-member">{count.created}</td>
          <td className="assigned-member">{count.assigned}</td>
          <td className="actions-member">
            <button
              className="px-2 py-0"
              onClick={
                member.userID === this.props.currentUser.userId
                  ? () =>
                      this.props.leaveTeamAction(
                        this.props.currentUser,
                        this.props.currentUser.userId
                      )
                  : () =>
                      this.props.kickTeam(
                        member.userID,
                        member.name,
                        this.props.currentUser.team.name
                      )
              }
            >
              {member.userID === this.props.currentUser.userId ? (
                <i className="fas fa-door-open"></i>
              ) : this.props.currentUser.leader ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                <></>
              )}
            </button>
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
                Icon
              </th>
              <th className="leader-col" scole="col"></th>
              <th className="name-col" scope="col">
                Name
              </th>
              <th className="created-stories-col" scope="col">
                Created
              </th>
              <th className="assigned-stories-col" scope="col">
                Assigned
              </th>
              <th className="kick-col" scope="col">
                Leave
              </th>
            </tr>
          </thead>
          <tbody>{this.renderMembers()}</tbody>
        </table>
      </div>
    );
  }
}

export default MemberView;
