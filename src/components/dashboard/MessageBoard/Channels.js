import React from "react";

class Channels extends React.Component {
  renderChannels() {
    return this.props.currentUser.channels.map((channel) => {
      return (
        <div className="channel-container" key={channel._id}>
          <button
            className={`channel-button ${
              channel._id === this.props.currentChannel._id ? "current" : ""
            }`}
          >
            # {channel.name}
          </button>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="channels">
        <div className="channels-header mt-2 px-3 py-2">
          <div>
            <img
              className="channel-profile"
              src={this.props.currentUser.profilePic}
              alt="profile"
            ></img>
            <p className="ml-2 mb-0">Channels</p>
          </div>
          <div>
            <button id="create-channel-icon" className="px-2">
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        <div className="channels-container mt-2">
          {this.renderChannels()}
          <button
            className="channel-button create"
            onClick={this.props.createChannel}
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
