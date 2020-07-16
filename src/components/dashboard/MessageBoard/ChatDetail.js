import React, { Component } from "react";
import moment from "moment";

import "../../../stylesheets/messageboard.css";

class ChatDetail extends Component {
  state = { membersCollapsed: false, actionsCollapsed: false };
  renderMembers() {
    return this.props.channel.members.map((member) => {
      return (
        <div key={member._id} className="teamMember">
          <img src={member.profilePic} alt="Member-profile"></img>
          <p>{member.name}</p>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="ChatDetailContainer">
        <div className="ChatDetailHeader">
          <h3>
            <i className="fas fa-hashtag"></i> {this.props.channel.name}
          </h3>
          {this.props.channel.messages.length > 0 ? (
            <p>
              Last message sent{" "}
              {moment(
                this.props.channel.messages[
                  this.props.channel.messages.length - 1
                ].date
              ).fromNow()}
            </p>
          ) : (
            <p>No messages currently in this channel</p>
          )}
        </div>
        <hr />
        <div className="ChatActionContainer">
          <button
            className="actionButton"
            type="button"
            data-toggle="collapse"
            data-target="#actionSection"
            aria-expanded="false"
            aria-controls="actionSection"
          >
            Actions
          </button>
          <div class="collapse" id="actionSection">
            <div className="chatContainerList">
              {this.props.channel._id ===
              this.props.currentUser.team.channel._id ? (
                <button disabled className="team-channel-leave">
                  Cannot Leave Team Channel
                </button>
              ) : (
                <button
                  className="leave-channel"
                  onClick={() => this.props.leaveChannel(this.props.channel)}
                >
                  Leave Channel
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="ChatMemberContainer">
          <button
            className="actionButton"
            type="button"
            data-toggle="collapse"
            data-target="#membersSection"
            aria-expanded="false"
            aria-controls="membersSection"
          >
            Members  ·  <span>{this.props.channel.members.length} members</span>
          </button>
          <div class="collapse" id="membersSection">
            <div id="membersSection" className="chatContainerList">
              {this.renderMembers()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatDetail;
