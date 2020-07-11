import React, { Component } from "react";

export default class Messages extends Component {
  state = { userMessage: "", displayMessage: "", messageSent: false };

  handleSendMessage(e) {
    e.preventDefault();
    //this.props.sendMessage(this.state.userMessage);
    this.setState({messageSent: true});
    this.setState({displayMessage: this.state.userMessage});
    this.setState({ userMessage: "" });
  }
  renderMessage = () => {
    if(this.state.messageSent){
    return (
      <div className="messageContainer author py-1 px-2">
        <span className="messageContainer author py-1 px-2">{this.state.displayMessage}</span>
      </div> 
      );
    }
  }

  render() {
    return (
      <div className="mainChatSection">
        <div className="mainChatHeader"></div>
        <div className="mainChat">
          <div className="MessageBoxContainer">
            <div className="messageSection">
              <div className="messageContainer py-1 px-2">
                <span>I did not send this message</span>
              </div>
              {this.renderMessage()}
            </div>
          </div>
          <div className="inputContainer">
            <form onSubmit={(e) => this.handleSendMessage(e)}>
              <input
                onChange={(e) => this.setState({ userMessage: e.target.value })}
                value={this.state.userMessage}
                autoFocus
                onBlur={(e) => e.target.focus()}
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
