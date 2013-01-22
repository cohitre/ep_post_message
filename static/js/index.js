var editor = require("ep_etherpad-lite/static/js/pad_editor").padeditor
  , _ = require("ep_etherpad-lite/static/js/underscore")._
  , availableMethods
  , postback = function (source, origin, object) {
      var message = JSON.stringify({
        callbackKey: object.callbackKey,
        data: availableMethods[object.method]()
      });
      source.postMessage(message, origin);
    };

availableMethods = {
  getText: function () {
    return [editor.ace.exportText()];
  }
};

exports.aceInitialized = function (event, args, callback) {
  var availableDomains = window.ep_postMessageDomains || [];

  window.addEventListener("message", function (e) {
    var object = JSON.parse(e.data)
      , origin = e.origin
      , source = e.source;

    if (_.include(availableDomains, origin)) {
      postback(source, origin, object);
    }
  }, false);

  return callback();
};
