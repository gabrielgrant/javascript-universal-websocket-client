// Adapted from http://www.websocket.org/echo.html

'use strict';


var WebSocket = require('universal-websocket-client');

var wsUri = "https://echo.websocket.org/";
var output;
var websocket;

function testWebSocket()
{
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) { onOpen(evt) };
  websocket.onclose = function(evt) { onClose(evt) };
  websocket.onmessage = function(evt) { onMessage(evt) };
  websocket.onerror = function(evt) { onError(evt) };
}

function onOpen(evt)
{
  writeToScreen("CONNECTED");
  doSend("WebSocket rocks");
}

function onClose(evt)
{
  writeToScreen("DISCONNECTED");
}

function onMessage(evt)
{
  writeToScreen('RESPONSE: ' + evt.data, "\x1b[34m");  // blue text
  websocket.close();
}

function onError(evt)
{
  writeToScreen('ERROR: ' + evt.data, "\x1b[31m");  // red text
}

function doSend(message)
{
  writeToScreen("SENT: " + message);
  websocket.send(message);
}

function writeToScreen(message, color)
{
  console.log('%s%s\x1b[0m', color || '', message);  // append reset
}

testWebSocket();

