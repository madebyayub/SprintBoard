import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";

import Channels from "./Channels";
import Messages from "./Messages";
import "../../../stylesheets/messageboard.css";

class MessageBoard extends React.Component {
  state = { usersMessage: "" };

  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.emit("join", {
      user: this.props.currentUser,
      msg: " joined the message board",
    });
  }
  sendMessage = (msg) => {
    this.socket.emit("message", { user: this.props.currentUser, msg });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="messageBoardContainer">
          <Channels currentUser={this.props.currentUser} />
          <Messages
            currentUser={this.props.currentUser}
            sendMessage={this.sendMessage}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps)(MessageBoard);
