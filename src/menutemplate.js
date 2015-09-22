var remote = require('remote'),
    app = remote.require('app'),
    shell = require('shell'),
    router = require('./router'),
    util = require('./utils/Util'),
    metrics = require('./utils/MetricsUtil'),
    settings = require('./settings');


var MenuTemplate = function () {
  return [
    {
      label: settings.menu.label,
      submenu: [
        {
          label: 'About ' + settings.menu.label,
          enabled: true,
          click: function () {
            metrics.track('Opened About', {
              from: 'menu'
            });
            router.get().transitionTo('about');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Dashboard',
          accelerator: util.CommandOrCtrl() + '+H',
          enabled: true,
          click: function () {
            metrics.track('Opened Dashboard', {
              from: 'menu'
            });
            router.get().transitionTo('home');
          }
        },
        {
          label: 'Preferences',
          accelerator: util.CommandOrCtrl() + '+,',
          enabled: true,
          click: function () {
            metrics.track('Opened Preferences', {
              from: 'menu'
            });
            router.get().transitionTo('preferences');
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: util.CommandOrCtrl() + '+Q',
          click: function() {
            app.quit();
          }
        }
      ]
    },
    {
   label: 'View',
   submenu: [
     {
       label: 'Toggle DevTools',
       accelerator: 'Alt+' + util.CommandOrCtrl() + '+I',
       click: function() { remote.getCurrentWindow().toggleDevTools(); }
     }
   ]
 },
    {
      label: 'Window',
      submenu: [
      {
        label: 'Minimize',
        accelerator: util.CommandOrCtrl() + '+M',
        selector: 'performMiniaturize:'
      },
      {
        label: 'Close',
        accelerator: util.CommandOrCtrl() + '+W',
        click: function () {
          remote.getCurrentWindow().hide();
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }
      ]
    },

    {
      label: 'Help',
      submenu: [
        {
          label: 'Report Issue or Suggest Feedback',
          click: function () {
            metrics.track('Opened Issue Reporter', {
              from: 'menu'
            });
            shell.openExternal('https://github.com/clearbucketlabs/SteveApp');
          }
        }
      ]
    }
  ];
};

module.exports = MenuTemplate;
