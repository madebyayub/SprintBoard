import React, { Component } from "react";

export default class Messages extends Component {
  state = { userMessage: "" };

  handleSendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.userMessage);
    this.setState({ userMessage: "" });
  }
  renderChannelMessages() {
    return this.props.channelMessages.map((message) => {
      if (message.author.userID === this.props.currentUser.userID) {
        return (
          <>
            <div className="messageContainer author">
              <div className="messageContent py-1 px-2">
                <span>{message.content}</span>
              </div>
              <img
                className="messageProfilePic"
                src={message.author.profilePic}
                alt="sender profile"
              ></img>
            </div>
          </>
        );
      } else {
        return (
          <>
            <div className="messageContainer">
              <img
                className="messageProfilePic"
                src={message.author.profilePic}
                alt="sender profile"
              ></img>
              <div className="messageContent py-1 px-2">
                <span>{message.content}</span>
              </div>
            </div>
          </>
        );
      }
    });
  }

  render() {
    return (
      <div className="mainChatSection">
        <div className="mainChatHeader"></div>
        <div className="mainChat">
          <div className="MessageBoxContainer">
            <div className="messageSection">{this.renderChannelMessages()}</div>
          </div>
          <div className="inputContainer">
            <form onSubmit={(e) => this.handleSendMessage(e)}>
              <input
                onChange={(e) => this.setState({ userMessage: e.target.value })}
                value={this.state.userMessage}
                autoFocus
                className="form-control inputMessage mt-2 px-2"
                placeholder="Send a message here..."
              />
            </form>
          </div>
        </div>
        <div className="right-side"></div>
      </div>
    );
  }
}
