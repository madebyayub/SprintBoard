import React, { Component } from "react";

export default class Messages extends Component {
  state = { userMessage: "", scroll: true };

  componentDidMount() {
    this.messageContainer = document.querySelector(".messageSection");
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  componentDidUpdate() {
    if (this.state.scroll) {
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
      this.setState({ scroll: false });
    }
  }

  handleSendMessage(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.userMessage);
    this.setState({ userMessage: "", scroll: true });
  }

  renderChannelMessages() {
    return this.props.channelMessages.map((message, index) => {
      if (message.author.userID === this.props.currentUser.userID) {
        return (
          <React.Fragment key={message._id}>
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
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={message._id}>
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
          </React.Fragment>
        );
      }
    });
  }

  render() {
    return (
      <div className="mainChatSection">
        <div className="mainChatHeader">
          <h2># {this.props.currentChannel.name}</h2>
        </div>
        <div className="mainChat">
          <div className="MessageBoxContainer">
            <div className="messageSection px-1">
              {this.props.loading ? (
                <div class="spinner-border text-primary mt-5" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                this.renderChannelMessages()
              )}
            </div>
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
      </div>
    );
  }
}
