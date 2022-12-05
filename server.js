const WebSocket = require("ws");

// Set up the WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Broadcast a message to all connected clients
function broadcast(data) {
  wss.clients.forEach(function(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data.toString());
    }
  });
}

// Handle incoming WebSocket connections
wss.on("connection", function(ws) {
  ws.on("message", function(data) {
    // When we receive a message from a client, broadcast it to all clients
    broadcast(data);
  });
});
