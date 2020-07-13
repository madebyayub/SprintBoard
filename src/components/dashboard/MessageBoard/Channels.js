import React from "react";

class Channels extends React.Component {
  renderChannels() {
    return this.props.currentUser.channels.map((channel) => {
      return <button>{channel.name}</button>;
    });
  }
  render() {
    return (
      <div className="channels">
        <div className="channels-header mt-2 px-3 py-2">
          <img src={this.props.currentUser.profilePic} alt="profile" />
          <p className="ml-2 mb-0">Channels</p>
          <i className="fas fa-plus"></i>
        </div>
        <div className="channels-container">{this.renderChannels()}</div>
      </div>
    );
  }
}

export default Channels;
