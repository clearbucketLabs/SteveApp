
var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

var settings = {
      app: {
        name: "SteveApp",
        beta: true,
      },
      menu: {
        label: "SteveApp",
      },
      title: "SteveApp",
      autoUpdater: {
        enabled: false,
        feedUrl: "http://UPDATE-SERVER/latest?version=[version]&beta=[beta]"
      },
      controls:{
        path: "components/controls"
      }
    },
    settingsjson = {};
try {
  settingsjson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings.json'), 'utf8'));
} catch (err) {}

settings = _.merge(settings, settingsjson);

module.exports = settings;
