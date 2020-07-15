import React, { Component } from "react";

export default class Messages extends Component {
  state = { userMessage: "", scroll: true };

  componentDidMount() {
    this.messageContainer = document.querySelector(".messageSection");
    this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
  }

  componentDidUpdate(prevState) {
    if (prevState.loading) {
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    } else if (this.state.scroll) {
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
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={message._id}>
            <div className="messageContainer">
              {index < this.props.channelMessages.length - 1 &&
              this.props.channelMessages[index + 1].author.userID ===
                message.author.userID ? (
                <>
                  {index > 0 &&
                  this.props.channelMessages[index - 1].author.userID !==
                    message.author.userID ? (
                    <p className="message-author-label">
                      {message.author.name}
                    </p>
                  ) : (
                    <></>
                  )}
                  <div className="messageContent no-picture py-1 px-2">
                    <span>{message.content}</span>
                  </div>
                </>
              ) : (
                <>
                  {index > 0 &&
                  this.props.channelMessages[index - 1].author.userID !==
                    message.author.userID ? (
                    <p className="message-author-label">
                      {message.author.name}
                    </p>
                  ) : (
                    <></>
                  )}
                  <img
                    className="messageProfilePic"
                    src={message.author.profilePic}
                    alt="sender profile"
                  ></img>
                  <div className="messageContent py-1 px-2">
                    <span>{message.content}</span>
                  </div>
                </>
              )}
            </div>
          </React.Fragment>
        );
      }
    });
  }

  render() {
    return (
      <div className={`${this.props.showChannelDetail ? "displayChatDetail" : "mainChatSection"}`}>
        <div className="mainChatHeader">
          <div className="mainChatHeaderDetail">
          <h2># {this.props.currentChannel.name}</h2>
          <button
              className="mainChatDetailSection px-2"
              onClick={this.props.showChatDetail}
            >
              <i className="fa fa-info-circle" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div className="mainChat">
          <div className="MessageBoxContainer">
            <div className="messageSection px-1">
              {this.props.loading ? (
                <div className="spinner-border text-primary mt-5" role="status">
                  <span className="sr-only">Loading...</span>
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
