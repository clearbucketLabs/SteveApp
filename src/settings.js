
var _ = require('lodash'),
    fs = require('fs'),
    path = require('path');

var settings = {
      app: {
        name: "Remote Rover/UAV Console",
        beta: true,
      },
      menu: {
        label: "Remote Rover/UAV Console",
      },
      title: "Remote Rover/UAV Console",
      autoUpdater: {
        enabled: false,
        feedUrl: "http://UPDATE-SERVER/latest?version=[version]&beta=[beta]"
      }
    },
    settingsjson = {};
try {
  settingsjson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'settings.json'), 'utf8'));
} catch (err) {}

settings = _.merge(settings, settingsjson);

module.exports = settings;
