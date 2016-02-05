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
  },
  getDocHeight: function () {
    return  $('iframe[name="ace_outer"]')
            .contents()
            .find('iframe')
            .contents()
            .find("#innerdocbody")
            .height();
  }
};

exports.aceInitialized = function (event, args, callback) {
  var pluginSettings = window.ep_post_message || {
    domains: []
  };

  window.addEventListener("message", function (e) {
    var object = JSON.parse(e.data)
      , origin = e.origin
      , source = e.source;

    if (_.include(pluginSettings.domains, origin)) {
      postback(source, origin, object);
    }
  }, false);

  return callback();
};
