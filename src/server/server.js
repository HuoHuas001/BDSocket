const WebSocket = require('ws')

const WSServer = WebSocket.Server;

class Logger {
    //日志输出API
    info(...args) {
        console.log(`[BDSocket][Info]`, ...args)
    }

    warn(...args) {
        console.log(`[BDSocket][Warn]`, ...args)
    }

    error(...args) {
        console.log(`[BDSocket][Error]`, ...args)
    }
}
const logger = new Logger();

class WebsocketServer {
    constructor(port) {
        this.server = new WSServer({
            port
        });

        this.server.on('connection', this.onConnection.bind(this));
        this.server.on('error', this.onError.bind(this));
    }

    onConnection(client) {
        console.log('Client connected');

        client.on('message', this.onMessage.bind(this, client));
        client.on('close', this.onClose.bind(this, client));
        client.on('error', this.onClientError.bind(this, client));
    }

    onMessage(client, message) {
        console.log(`[WebSocket] Received:${message}`);
        client.send(`ECHO:${message}`, (err) => {
            if (err) {
                console.log(`[WebSocket] error:${err}`);
            }
        })
    }

    onClose(client,code,reason) {
        console.log(`[WebSocket] Connection Closed. Code:${code} Reason:${reason}`);
    }

    onError(error) {
        logger.error(`[WebSocket] Connection Server Error:${error}`);
    }

    onClientError(client, error) {
        logger.error(`[WebSocket] Connection Client Error:${error}`);
    }
}


module.exports = WebsocketServer;