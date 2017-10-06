
import React, {Component} from 'react';

class ChatBar extends Component {

  constructor() {
    super();
    this.state = {
      content : "",
      user : ""
    };
    this.onContent = this.onContent.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onUser = this.onUser.bind(this);
    this.onEnterUser = this.onEnterUser.bind(this);
  }

  //monitor message textbox
  onContent(event) {
    this.setState({
      content : event.target.value
    });
  }

  //monitor user textbox
  onUser(event) {
    this.setState({
      user : event.target.value
    });
  }

  //accept a new message
  onEnter(event) {
    if(event.keyCode === 13) {
      this.props.onNewMessage(this.state.content);
      event.target.value = "";
    }
  }

  //accept a new user name
  onEnterUser(event) {
    if(event.keyCode === 13) {
      this.props.onNewUser(this.state.user);
    }
  }

  //display chatbar and accept messages, notifications
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.name} onChange={this.onUser} onKeyUp={this.onEnterUser} />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onChange={this.onContent} onKeyUp={this.onEnter} />
      </footer>
    );
  }
}
export default ChatBar;