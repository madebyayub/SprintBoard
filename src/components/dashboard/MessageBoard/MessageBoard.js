import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import moment from "moment";

import Channels from "./Channels";
import Messages from "./Messages";
import "../../../stylesheets/messageboard.css";
import ChannelBrowser from "./ChannelBrowser";

class MessageBoard extends React.Component {
  state = {
    channel: this.props.currentUser.team.channel,
    channelMessages: [],
    browseChannels: false,
    channelResults: this.props.currentUser.channels,
    loading: true,
  };

  componentDidMount() {
    this.socket = io("localhost:3001");
    this.socket.emit("join", {
      user: this.props.currentUser,
      channel: this.state.channel,
    });
    this.socket.emit("populateChannel", {
      channel: this.state.channel,
    });
    this.socket.on("receiveChannel", (populatedChannel) => {
      this.setState({
        channelMessages: populatedChannel.channel.messages,
        loading: false,
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

  changeChannel = (channel) => {
    this.socket.emit("populateChannel", {
      channel: channel,
    });
    this.setState({ channel: channel, browseChannels: false, loading: true });
  };

  showBrowseChannel = () => {
    this.setState({ channel: null, browseChannels: true });
  };

  searchChannel(channelName) {
    this.socket.emit("searchChannel", {
      channelName,
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
            browseChannels={this.state.browseChannels}
            changeChannel={this.changeChannel}
            showBrowseChannel={this.showBrowseChannel}
            currentChannel={this.state.channel}
            currentUser={this.props.currentUser}
          />
          {this.state.browseChannels ? (
            <ChannelBrowser
              currentUser={this.props.currentUser}
              channelResults={this.state.channelResults}
            />
          ) : (
            <Messages
              loading={this.state.loading}
              currentChannel={this.state.channel}
              channelMessages={this.state.channelMessages}
              socket={this.socket}
              currentUser={this.props.currentUser}
              sendMessage={this.sendMessage}
            />
          )}
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
