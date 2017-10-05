
import React, {Component} from 'react';
import ChatBar from './Chatbar.jsx';
import MessageList from  './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: []
    };
    this.onNewMessage = this.onNewMessage.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
  }

  componentDidMount() {
    this.state.webSocket = new WebSocket("ws://localhost:3001");
    this.state.webSocket.addEventListener('message', (event) => {
      const broadcastMessage = (JSON.parse(event.data));
      const messages = this.state.messages.concat(broadcastMessage);
      this.setState({messages : messages});
    })
  }

  onNewMessage(messageContent) {
    const newMessage = {username : this.state.currentUser.name, content : messageContent};
    if (true) {   //add error handling
      this.state.webSocket.send(JSON.stringify(newMessage));
    }
  }

  onNewUser(username) {
    this.state.currentUser.name = username;
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main className="messages">
          <MessageList messages = {this.state.messages} />
        </main>
        <ChatBar name = {this.state.currentUser.name} onNewMessage = {this.onNewMessage} onNewUser = {this.onNewUser} />
      </div>
    );
  }
}
export default App;