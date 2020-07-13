import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import moment from "moment";

import Channels from "./Channels";
import Messages from "./Messages";
import "../../../stylesheets/messageboard.css";

class MessageBoard extends React.Component {
  state = { channel: this.props.currentUser.team.channel, channelMessages: [] };

  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.emit("join", {
      user: this.props.currentUser,
      msg: " joined the message board",
    });
    this.socket.emit("populateChannel", {
      channel: this.state.channel,
    });
    this.socket.on("receiveChannel", (populatedChannel) => {
      this.setState({
        channelMessages: populatedChannel.channel.messages,
      });
    });
    this.socket.on("message", (msg) => {
      if (msg.author.userID !== this.props.currentUser.userID) {
        this.setState({
          channelMessages: [...this.state.channelMessages, msg],
        });
      }
    });
  }

  sendMessage = (msg) => {
    const newMessage = {
      author: {
        name: this.props.currentUser.name,
        userID: this.props.currentUser.userID,
        profilePic: this.props.currentUser.profilePic,
      },
      date: moment(),
      content: msg,
    };
    this.socket.emit("message", {
      user: newMessage.author,
      msg,
      channel: this.state.channel,
    });
    this.setState({
      channelMessages: [...this.state.channelMessages, newMessage],
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="messageBoardContainer">
          <Channels
            currentChannel={this.state.channel}
            currentUser={this.props.currentUser}
          />
          <Messages
            currentChannel={this.state.channel}
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
