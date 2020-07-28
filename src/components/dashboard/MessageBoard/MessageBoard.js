import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import moment from "moment";

import Channels from "./Channels";
import Messages from "./Messages";
import ChannelBrowser from "./ChannelBrowser";
import CreateChannelModal from "./CreateChannelModal";
import { updateUserChannels } from "../../../actions";
import "../../../stylesheets/messageboard.css";

class MessageBoard extends React.Component {
  state = {
    channel: this.props.currentUser.team.channel,
    channelMessages: [],
    browseChannels: false,
    channelResults: this.props.currentUser.channels,
    memberResults: this.props.currentUser.team.members,
    loading: true,
    showCreateChannel: false,
    showChannelDetail: false,
  };

  componentDidMount() {
    this.socket = io("http://api.sprintboard.ca");
    this.socket.emit("populateChannel", {
      channel: this.state.channel,
    });
    this.socket.on("receiveChannel", (populatedChannel) => {
      this.setState({
        channel: populatedChannel.channel,
        channelMessages: populatedChannel.channel.messages,
        loading: false,
      });
    });
    this.socket.on("channelListUpdate", ({ user, channel }) => {
      this.props.updateUserChannels(user.channels);
      this.setState({ channel: channel, browseChannels: false, loading: true });
      this.socket.emit("populateChannel", {
        channel: channel,
      });
    });

    this.socket.on("searchChannelResults", ({ channels }) => {
      this.setState({ channelResults: channels });
    });

    this.socket.on("searchMemberResults", ({ results }) => {
      this.setState({ memberResults: results });
    });

    this.socket.on("message", (msg) => {
      if (this.state.channel._id.toString() === msg.channelID) {
        if (msg.author.userID !== this.props.currentUser.userID) {
          this.setState({
            channelMessages: [...this.state.channelMessages, msg],
          });
        }
      }
    });
  }

  resetChannelResults = () => {
    this.setState({ channelResults: this.props.currentUser.channels });
  };

  resetMemberResults = () => {
    this.setState({ memberResults: this.props.currentUser.team.members });
  };

  showBrowseChannel = () => {
    this.setState({
      channel: null,
      browseChannels: true,
      showChannelDetail: false,
    });
  };

  toggleChatDetail = () => {
    this.setState({
      showChannelDetail: !this.state.showChannelDetail,
    });
  };

  toggleCreateChannelModal = () => {
    this.setState({ showCreateChannel: !this.state.showCreateChannel });
  };

  addMembers = (members, channel) => {
    this.socket.emit("addMembers", {
      members: members,
      channel: channel,
    });
  };

  changeChannel = (channel) => {
    this.socket.emit("populateChannel", {
      channel: channel,
    });
    this.setState({
      channel: channel,
      channelResults: this.props.currentUser.channels,
      browseChannels: false,
      loading: true,
    });
  };

  createChannel = (name, isPrivate) => {
    this.socket.emit("createChannel", {
      name,
      isPrivate,
      user: this.props.currentUser._id,
    });
  };

  joinChannel = (channel) => {
    this.socket.emit("joinChannel", {
      channel: channel._id,
      user: this.props.currentUser._id,
    });
  };

  leaveChannel = (channel) => {
    this.socket.emit("leaveChannel", {
      channel: channel._id,
      user: this.props.currentUser._id,
    });
    this.setState({
      showChannelDetail: false,
      channel: this.props.currentUser.team.channel,
    });
  };

  searchMembers = (member) => {
    this.socket.emit("searchMember", {
      search: member,
    });
  };

  searchChannel = (channelName) => {
    this.socket.emit("searchChannel", {
      name: channelName,
    });
  };

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
              joinChannel={this.joinChannel}
              resetChannelResults={this.resetChannelResults}
              searchChannel={this.searchChannel}
              toggleCreateChannelModal={this.toggleCreateChannelModal}
              currentUser={this.props.currentUser}
              channelResults={this.state.channelResults}
            />
          ) : (
            <Messages
              addMembers={this.addMembers}
              searchMembers={this.searchMembers}
              resetMemberResults={this.resetMemberResults}
              memberSearchResults={this.state.memberResults}
              leaveChannel={this.leaveChannel}
              showChannelDetail={this.state.showChannelDetail}
              loading={this.state.loading}
              currentChannel={this.state.channel}
              channelMessages={this.state.channelMessages}
              currentUser={this.props.currentUser}
              sendMessage={this.sendMessage}
              toggleChatDetail={this.toggleChatDetail}
            />
          )}
        </div>
        /
        <CreateChannelModal
          createChannel={this.createChannel}
          closeModal={this.toggleCreateChannelModal}
          showCreateChannel={this.state.showCreateChannel}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
  };
};

export default connect(mapStateToProps, { updateUserChannels })(MessageBoard);
