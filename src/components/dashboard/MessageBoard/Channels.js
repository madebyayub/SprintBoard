import React from "react";

class Channels extends React.Component {
  renderChannels() {
    return this.props.currentUser.channels.map((channel) => {
      if (channel._id === this.props.currentUser.team.channel._id) {
        return (
          <React.Fragment
            key={this.props.currentUser.team.channel._id}
          ></React.Fragment>
        );
      } else {
        return (
          <div className="channel-container" key={channel._id}>
            <button
              className={`channel-button ${
                this.props.currentChannel &&
                channel._id === this.props.currentChannel._id
                  ? "current"
                  : ""
              }`}
              onClick={() => this.props.changeChannel(channel)}
            >
              <i className="fas fa-hashtag"></i> {channel.name}{" "}
              {channel.private ? (
                <span className="locked-channel ml-2">
                  <i class="fas fa-lock"></i>
                </span>
              ) : (
                ""
              )}
            </button>
          </div>
        );
      }
    });
  }

  renderTeamChannel() {
    return (
      <div
        className="channel-container"
        key={this.props.currentUser.team.channel._id}
      >
        <button
          className={`channel-button ${
            this.props.currentChannel &&
            this.props.currentUser.team.channel._id ===
              this.props.currentChannel._id
              ? "current"
              : ""
          }`}
          onClick={() =>
            this.props.changeChannel(this.props.currentUser.team.channel)
          }
        >
          <i className="fas fa-thumbtack pinned"></i>{" "}
          <i className="fas fa-hashtag"></i>{" "}
          {this.props.currentUser.team.channel.name}
          <span className="locked-channel ml-2">
            <i className="fas fa-lock"></i>
          </span>
        </button>
      </div>
    );
  }
  render() {
    return (
      <div className="channels">
        <div className="channels-header px-3">
          <div>
            <img
              className="channel-profile"
              src={this.props.currentUser.profilePic}
              alt="profile"
            ></img>
            <p className="ml-2 mb-0">Channels</p>
          </div>
          <button
            id="create-channel-icon"
            onClick={this.props.showBrowseChannel}
            className="py-1 px-2"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
        <div className="channels-container mt-2">
          {this.renderTeamChannel()}
          {this.renderChannels()}
          <button
            className={`channel-button create ${
              this.props.browseChannels ? "current" : ""
            }`}
            onClick={this.props.showBrowseChannel}
          >
            <i className="fas fa-plus"></i>
            Add a channel
          </button>
        </div>
      </div>
    );
  }
}

export default Channels;
