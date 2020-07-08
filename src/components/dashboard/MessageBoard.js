import React from "react";
import io from "socket.io-client";

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
    return <div>MessageBoard</div>;
  }
}

export default MessageBoard;
