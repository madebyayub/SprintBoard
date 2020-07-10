import React from "react";

class Channels extends React.Component {
  render() {
    return (
      <div className="channels">
        <div className="channels-header mt-2 px-3 py-2">
          <img src={this.props.currentUser.profilePicture} alt="profile" />
          <p className="ml-2 mb-0">Channels</p>
          <i className="fas fa-plus"></i>
        </div>
      </div>
    );
  }
}

export default Channels;
