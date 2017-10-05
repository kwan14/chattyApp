
import React, {Component} from 'react';

class Message extends Component {

  render() {
    const listNotifications = this.props.notifications.map((notification) =>
      <div key={notification.id} className="message">
        {notification.content}
      </div>
    );
    return (
      <div className="message system">
        {listNotifications}
      </div>
    );
  }
}
export default Message;