
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from  './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      notifications: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  componentDidMount() {
    this.state.webSocket = new WebSocket("ws://localhost:3001");
    this.state.webSocket.addEventListener('message', (event) => {
      const broadcastMessage = (JSON.parse(event.data));
      if (broadcastMessage.type === "incomingMessage") {
        const messages = this.state.messages.concat(broadcastMessage);
        this.setState({messages : messages});
      } else if (broadcastMessage.type === "incomingNotification") {
        const notifications = this.state.notifications.concat(broadcastMessage);
        this.setState({notifications : notifications});
      }
    })
  }

  onNewMessage(messageContent) {
    const newMessage = {username : this.state.currentUser.name, content : messageContent, type: "postMessage"};
    if (true) {   //add error handling
      this.state.webSocket.send(JSON.stringify(newMessage));
    }
  }

  onNewUser(username) {
    const newNotification = {content : this.state.currentUser.name + " changed their name to " + username, type : "postNotification"}
    this.state.currentUser.name = username;
    if (true) {   //add error handling
      this.state.webSocket.send(JSON.stringify(newNotification));
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <Message notifications = {this.state.notifications} />
          <MessageList messages = {this.state.messages} />
        </main>
        <ChatBar name = {this.state.currentUser.name} onNewMessage = {this.onNewMessage} onNewUser = {this.onNewUser} />
      </div>
    );
  }
}
export default App;