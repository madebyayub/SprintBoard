import React from "react";
import io from "socket.io-client";
import "../../stylesheets/messageboard.css";
let socket;
class MessageBoard extends React.Component {
  state = {usersMessage: ''};

  componentDidMount() {
    socket = io('localhost:3001');
    socket.emit('join',{message: 'visited message baord'});
  }
  sendMessage = (e) => {
    e.preventDefault();
    console.log(this.state.usersMessage);
    socket.emit('join',{message: this.state.usersMessage});
    this.setState({usersMessage: ''});
    console.log(this.state.usersMessage);
  }


  render() {
    return (
    <div className="container-fluid">
      <div className="messageBoardContainer">
        <div className="groupSection">
          <div className="groupSectionHeader">
            <i className="fa fa-user-circle-o mt-2 ml-2" aria-hidden="true"></i>
            <div className="text ml-3">Chat</div>
          </div>
        </div>
        <div className="mainChatSection">
          <div className="mainChatHeader">
            <div style={{height:"100%", width:"25%"}}>
              <i className="fa fa-user-circle-o mt-2 ml-4" aria-hidden="true" style={{fontSize:"xx-large"}}></i>
            </div>
          </div>
          <div className="mainChat">
            <div className="MessageBoxContainer">
              <div className= "messageSection">
                <div className="messageContainerright py-1 px-2">
                  <span>hello world this is the message</span>
                </div>
              </div>
            </div>
              <div className="inputContainer">
              <form onSubmit={(e) => this.sendMessage(e)}>
              <input  onChange={(e) => this.setState({usersMessage: e.target.value})} value={this.state.usersMessage} className="inputMessage mt-2 px-2" placeholder="send a Message..."/> 
              </form>
              </div>
          </div>
          <div className="mainChatRight">
          </div>
        </div>
      </div> 
    </div>
    );
  }
}

export default MessageBoard;
