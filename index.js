var settings = require('ep_etherpad-lite/node/utils/Settings')
  , pluginSettings;

if(settings.ep_post_message) {
  pluginSettings = settings.ep_post_message;
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  var scriptString = "<script type='text/javascript'>" +
    "  window.ep_post_message = " + JSON.stringify(pluginSettings) + ";" +
    "</script>";

  args.content = args.content + scriptString;

  return cb();
}

