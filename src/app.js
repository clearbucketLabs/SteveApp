require.main.paths.splice(0, 0, process.env.NODE_PATH);

var remote = require('remote'),
    Menu = remote.require('menu'),
    React = require('react'),
    Router = require('react-router'),
    ipc = require('ipc'),
    routerContainer = require('./router'),
    template = require('./menutemplate'),
    webUtil = require('./utils/WebUtil'),
    settings = require('./settings'),
    ControlLoader=require('./lib/ControlLoader'),
    dashboardActions=require('./actions/dashboardActions'),
    dashboardStore=require('./stores/DashboardStore'),
    dataStore=require('./stores/dataStore'),
    deviceManager = require('./lib/deviceManager');


webUtil.addWindowSizeSaving();
webUtil.addLiveReload();
webUtil.disableGlobalBackspace();
Menu.setApplicationMenu(Menu.buildFromTemplate(template()));

deviceManager.init();

var routes = require('./routes');

var router = Router.create({
    routes: routes
});

router.run(Handler => React.render(<Handler/>, document.body));
routerContainer.set(router);

ControlLoader.loadControls(settings.controls.path);


//Get Configurations - Dashboard+robots

ipc.on('application:quitting', function () {
  if(SteveApi.isPortOpen)
    {
      SteveApi.closePort();
    }
});


module.exports = {
  router: router
};
