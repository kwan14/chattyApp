
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from  './MessageList.jsx';
import Message from './Message.jsx';
import Active from './Active.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      notifications: [],
      activeUsers: 0
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  componentDidMount() {
    this.state.webSocket = new WebSocket("ws://localhost:3001");
    this.state.webSocket.addEventListener('message', (event) => {
      const broadcastMessage = (JSON.parse(event.data));

      //route inbound broadcasts to the correct component using the message type
      switch(broadcastMessage.type) {
        case "incomingMessage" :
          const messages = this.state.messages.concat(broadcastMessage);
          this.setState({messages : messages});
          break;
        case "incomingNotification" :
          const notifications = this.state.notifications.concat(broadcastMessage);
          this.setState({notifications : notifications});
          break;
        case "userCount" :
          this.setState({activeUsers : broadcastMessage.userCount});
          break;
        default :
          console.log("Unknown message type received.");
          break;
      }
    })
  }

  //process new messages from the chatbar
  onNewMessage(messageContent) {
    const newMessage = {username : this.state.currentUser.name, content : messageContent, type: "postMessage"};
    if (this.state.webSocket.readyState === this.state.webSocket.OPEN) {
      this.state.webSocket.send(JSON.stringify(newMessage));
    }
  }

  //process new notifications from the chatbar
  onNewUser(username) {
    const newNotification = {content : this.state.currentUser.name + " changed their name to " + username, type : "postNotification"}
    this.state.currentUser.name = username;
    if (this.state.webSocket.readyState === this.state.webSocket.OPEN) {
      this.state.webSocket.send(JSON.stringify(newNotification));
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <Active users = {this.state.activeUsers} />
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