require.main.paths.splice(0, 0, process.env.NODE_PATH);

var remote = require('remote'),
    Menu = remote.require('menu'),
    React = require('react'),
    Router = require('react-router'),
    ipc = require('ipc'),
    routerContainer = require('./router'),
    routes = require('./routes'),
    template = require('./menutemplate'),
    webUtil = require('./utils/WebUtil'),
    settings = require('./settings'),
    ControlLoader=require('./lib/ControlLoader'),
    dashboardActions=require('./actions/dashboardActions')



webUtil.addWindowSizeSaving();
webUtil.addLiveReload();
webUtil.disableGlobalBackspace();
Menu.setApplicationMenu(Menu.buildFromTemplate(template()));


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
