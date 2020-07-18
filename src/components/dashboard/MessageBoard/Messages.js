import React, { Component } from "react";
import ChatDetail from "./ChatDetail";
import AddChannelMemberModal from "./AddChannelMemberModal";
import ReactTooltip from "react-tooltip";
import moment from "moment";

export default class Messages extends Component {
  state = { userMessage: "", scroll: true, showAddMemberModal: false };

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

  onAddMember = () => {
    this.setState({ showAddMemberModal: !this.state.showAddMemberModal });
  };

  handleSendMessage(e) {
    e.preventDefault();
    if (this.state.userMessage !== "") {
      this.props.sendMessage(this.state.userMessage);
      this.setState({ userMessage: "", scroll: true });
    }
  }

  renderChannelMessages() {
    return this.props.channelMessages.map((message, index) => {
      if (message.author.userID === this.props.currentUser.userID) {
        return (
          <React.Fragment key={message._id}>
            <div className="messageContainer author">
              <div
                className="messageContent py-1 px-2"
                data-tip
                data-for={message._id}
              >
                <span>{message.content}</span>
              </div>
              <ReactTooltip
                id={message._id}
                type="dark"
                effect="solid"
                place="left"
              >
                <span>{moment(message.date).fromNow()}</span>
              </ReactTooltip>
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
                    <>
                      {index === 0 ? (
                        <p className="message-author-label">
                          {message.author.name}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                  <div
                    className="messageContent no-picture py-1 px-2"
                    data-tip
                    data-for={message._id}
                  >
                    <span>{message.content}</span>
                  </div>
                  <ReactTooltip
                    id={message._id}
                    type="dark"
                    effect="solid"
                    place="left"
                  >
                    <span>{moment(message.date).fromNow()}</span>
                  </ReactTooltip>
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
                    <>
                      {index === 0 ? (
                        <p className="message-author-label">
                          {message.author.name}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                  <img
                    className="messageProfilePic"
                    src={message.author.profilePic}
                    alt="sender profile"
                  ></img>
                  <div
                    className="messageContent py-1 px-2"
                    data-tip
                    data-for={message._id}
                  >
                    <span>{message.content}</span>
                  </div>
                  <ReactTooltip
                    id={message._id}
                    type="dark"
                    effect="solid"
                    place="left"
                  >
                    <span>{moment(message.date).fromNow()}</span>
                  </ReactTooltip>
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
      <>
        <div className="mainChatSection">
          <div className="mainChatHeader">
            <div className="mainChatHeaderDetail">
              <h2>
                # {this.props.currentChannel.name}{" "}
                {this.props.currentChannel.private ? (
                  <span className="locked-channel ml-2">
                    <i class="fas fa-lock"></i>
                  </span>
                ) : (
                  ""
                )}{" "}
              </h2>
              <div>
                <button className="px-2" onClick={() => this.onAddMember()}>
                  <i className="fas fa-plus"></i>
                </button>
                <button
                  className="px-2 mr-4"
                  onClick={this.props.toggleChatDetail}
                >
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
          <div
            className={
              this.props.showChannelDetail
                ? "mainChat displayChannelDetail"
                : "mainChat"
            }
          >
            <div className="MessageBoxContainer">
              <div className="messageSection px-1">
                {this.props.loading ? (
                  <div
                    className="spinner-border text-primary mt-5"
                    role="status"
                  >
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
                  onChange={(e) =>
                    this.setState({ userMessage: e.target.value })
                  }
                  value={this.state.userMessage}
                  autoFocus
                  className="form-control inputMessage mt-2 px-2"
                  placeholder="Send a message here..."
                />
              </form>
            </div>
          </div>
          {this.props.showChannelDetail ? (
            <ChatDetail
              onAddMember={this.onAddMember}
              currentUser={this.props.currentUser}
              leaveChannel={this.props.leaveChannel}
              channel={this.props.currentChannel}
              showChannelDetail={this.props.showChannelDetail}
              showChatDetail={this.props.toggleChatDetail}
            />
          ) : (
            <></>
          )}
        </div>
        <AddChannelMemberModal
          channel={this.props.currentChannel}
          resetMemberResults={this.props.resetMemberResults}
          searchMembers={this.props.searchMembers}
          memberSearchResults={this.props.memberSearchResults}
          showAddMember={this.state.showAddMemberModal}
          closeModal={this.onAddMember}
        />
      </>
    );
  }
}
