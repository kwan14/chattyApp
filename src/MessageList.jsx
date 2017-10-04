
import React, {Component} from 'react';

class MessageList extends Component {

  render() {
    console.log("Rendering <MessageList />");
    const listMessages = this.props.messages.map((message) =>
      <div key={message.id} className="message">
        <span className="message-username">{message.username}</span>
        <span className="message-content">{message.content}</span>
      </div>
    );
    return (
      <div>
        {listMessages}
      </div>
    );
  }
}
export default MessageList;

