// Support TLS-specific URLs, when appropriate.
if (window.location.protocol == "https:") {
  var ws_scheme = "wss://";
} else {
  var ws_scheme = "ws://"
};


var ws = new ReconnectingWebSocket(ws_scheme + location.hostname + ":9000");
var chatText = document.getElementById("chat-text");
ws.onmessage = function(message) {
  var data = JSON.parse(message.data);
  var bubble = document.createElement('div');
  bubble.className = "bubble";
  bubble.textContent = data.message;
  chatText.append(bubble);
};

ws.onclose = function(){
    console.log('inbox closed');
    this.ws = new WebSocket(ws.url);
};

var inputForm = document.getElementById("input-form");
var inputText = document.getElementById("input-text");
inputForm.addEventListener("submit", function(evt) {
  evt.preventDefault();
  ws.send(JSON.stringify({ message: inputText.value }));
  inputText.value = "";
});
