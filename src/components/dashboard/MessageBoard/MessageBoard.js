import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import moment from "moment";

import Channels from "./Channels";
import Messages from "./Messages";
import "../../../stylesheets/messageboard.css";

class MessageBoard extends React.Component {
  state = { channel: null, channelMessages: [] };

  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.emit("join", {
      user: this.props.currentUser,
      msg: " joined the message board",
    });
  }

  componentDidUpdate() {
    this.socket.on("message", (msg) => {
      console.log(msg);
      this.setState({ channelMessages: [...this.state.channelMessages, msg] });
    });
  }

  sendMessage = (msg) => {
    const newMessage = {
      author: {
        name: this.props.currentUser.name,
        userID: this.props.currentUser.userId,
        profilePic: this.props.currentUser.profilePicture,
      },
      date: moment(),
      content: msg,
    };
    this.socket.emit("message", { user: newMessage.author, msg });
    this.setState({
      channelMessages: [...this.state.channelMessages, newMessage],
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="messageBoardContainer">
          <Channels currentUser={this.props.currentUser} />
          <Messages
            channelMessages={this.state.channelMessages}
            socket={this.socket}
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
