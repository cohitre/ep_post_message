var settings = require('ep_etherpad-lite/node/utils/Settings')
  , accessibleDomains = [];

if(settings.ep_postMessageDomains) { // Setup testing else poop out
  accessibleDomains = settings.ep_postMessageDomains;
}

exports.eejsBlock_scripts = function (hook_name, args, cb) {
  var scriptString = "<script type='text/javascript'>" +
    "  var ep_postMessageDomains = " + JSON.stringify(accessibleDomains) + ";" +
    "</script>";

  args.content = args.content + scriptString;

  return cb();
}

