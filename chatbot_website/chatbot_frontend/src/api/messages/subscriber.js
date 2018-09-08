import ReconnectingWebsocket from 'reconnecting-websocket';

const URL = '//chat';
var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
const URL = `${ws_scheme}://${window.location.host$}/chat`;

export default class Subscriber {
  constructor(options = {}) {
    this.options = {
      ...options
    };
    this.handlers = {};
    this.subscriber = null;
  }

  setConnectHandler(handleConnect) {
    this.handlers.handleConnect = handleConnect;
  }

  setDisconnectHandler(handleDisconnect) {
    this.handlers.handleDisconnect = handleDisconnect;
  }

  setErrorHandler(handleError) {
    this.handlers.handleError = handleError;
  }

  setMessageHandler(handleMessage) {
    this.handlers.handleMessage = handleMessage;
  }

  onConnect(evt) {
    const { handleConnect } = this.handlers;
    handleConnect && handleConnect(evt);
  }

  onDisconnect(message) {
    const { handleDisconnect } = this.handlers;
    handleDisconnect && handleDisconnect({ message });
  }

  onError(message) {
    const { handleError } = this.handlers;
    handleError && handleError({ message });
  }

  onMessage(message) {
    const { handleMessage } = this.handlers;
    handleMessage && handleMessage({ message: JSON.parse(message.data) });
  }

  subscribe(streamNames) {
    if (this.subscriber && this.subscriber.running) {
      this.subscriber.stop();
    }
    this.subscriber = new ReconnectingWebsocket(URL)
    this.subscriber.addEventListener('message', this.onMessage.bind(this));
    this.subscriber.addEventListener('error', this.onError.bind(this));
    this.subscriber.addEventListener('close', this.onDisconnect.bind(this));
    this.subscriber.addEventListener('open', this.onConnect.bind(this));
  }

  unsubscribe() {
    this.subscriber && this.subscriber.close();
    this.handlers = {};
  }

  send(message) {
    this.subscriber.send(JSON.stringify({ message }));
  }
}
