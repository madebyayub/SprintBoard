import React, { Component } from 'react';

import "../../../stylesheets/messageboard.css";

class ChatDetail extends Component {
    render() {
        return (
        <div className="ChatDetailContainer">
            <div className="ChatDetailHeader">
                {this.props.showChannelDetail ?  
                    <button
                    className="mainChatDetailSection px-2"
                    onClick={this.props.showChatDetail}
                    >
                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </button>: ""}
            </div>
        </div>
        );
    }
}

export default ChatDetail;