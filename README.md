ep_post_message
===============

Message posting to an etherpad hosted in an iframe

Example
-------

```
// get a reference to the etherpad inner frame
var etherpadFrame = $('iframe')[0];


// send a message to the window, specifying which method you want to invoke
// check `availableMethods` in `static/js/index.js` for what's available

etherpadFrame.contentWindow.postMessage(JSON.stringify({
  callbackKey: '1234',
  method: 'getDocHeight'
}), '*');


// listen for the message event, check that the callback key matches

window.addEventListener('message', function(event) {
  var data = JSON.parse(event.data);
  if (data && data.callbackKey === '1234') {
    // do something with the result
  }
});
```
