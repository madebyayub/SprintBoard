import React from "react";
import io from "socket.io-client";
import "../../stylesheets/messageboard.css";
let socket;
class MessageBoard extends React.Component {
  componentDidMount() {
    socket = io('localhost:3001');
    socket.emit('join',{message: 'visited message baord'});
  }
  componentDidUpdate(){
    socket = io('localhost:3001');
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
              
            </div>
              <div className="inputContainer">
              <input  className="inputMessage mt-2" placeholder=" send  a Message..."/> 
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
