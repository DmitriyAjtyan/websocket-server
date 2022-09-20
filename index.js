import WebSocket, { WebSocketServer } from 'ws';

const WEBSOCKET_PORT = 8080;

const getWebsocketMessage = (obj) => {
  try {
    return JSON.stringify(obj);
  } catch(error) {
    console.log(`getWebsocketMessage error: ${error}\ngot ${obj} as input`);
    return '';
  }
};

const socketServer = new WebSocketServer({ port: WEBSOCKET_PORT });

console.log(`websocket server started on port: ${WEBSOCKET_PORT}`);

socketServer.on('connection', (ws) => {
  ws.on('message', (data) => {
    console.log('received: %s', data);

    socketServer.clients.forEach((client) => {
      console.log('client: ', client)
      if (client.readyState === WebSocket.OPEN) {
        client.send(String(data));
      }
    });
  });

  console.log('socketServer: ', socketServer)

  ws.send(getWebsocketMessage({
    date: Date.now(),
    text: 'Welcome to Chat',
  }));
});
