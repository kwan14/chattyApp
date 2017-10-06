
const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

//take objects, convert them to JSON and broadcast the message to all connected clients
function sendBroadcast (broadcast) {
  broadcast = JSON.stringify(broadcast);
  wss.clients.forEach((client) => {
    if(client.readyState === WebSocket.OPEN) {
      client.send(broadcast);
    }
  })
}

wss.on('connection', (ws) => {

  //update client count when a user connects
  sendBroadcast({userCount : wss.clients.size, type : "userCount"});

  //accept inbound messages, process them and then echo them back out
  ws.on('message', (newMessage) => {
    const message = JSON.parse(newMessage);
    switch(message.type) {
      case "postMessage" :
        message.id = uuidv4();
        message.type = "incomingMessage";
        break;
      case "postNotification" :
        message.id = uuidv4();
        message.type = "incomingNotification";
        break;
      default :
        console.log("Unknown message type processed.");
        break;
    }

    sendBroadcast(message);
  });

  //update client count when a user disconnects
  ws.on('close', () => {
    sendBroadcast({userCount : wss.clients.size, type : "userCount"});
  });

});








