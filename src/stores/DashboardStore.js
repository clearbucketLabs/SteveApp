
let alt = require('../alt'),
    _ = require('lodash'),
    actions = require('./../actions/dashboardActions'),
    deviceActions = require('./../actions/deviceActions'),
    utils = require('./../utils/Util'),
    deviceManager = require('./../lib/deviceManager'),
    controlLoader = require('./../lib/ControlLoader');

let DashboardStore = alt.createStore({
  displayName: 'DashboardStore',
  bindListeners: {
    addItem: actions.addControl,
    showAddControl: actions.showAddControl,
    hideAddControl: actions.hideAddControl,
    saveDashboard: actions.saveDashboard,
    deviceLoaded: deviceActions.deviceLoaded
  },

  state: {
    dashboardControlsList: {},
    addControlVisible: false,
    loaded: false,
    configurationSelected:false
  },

  publicMethods: {
    hasControls: function () {
      return !!this.state.dashboardControlsList.length;
    }
  },

  deviceLoaded: function(device){
    //device was selected
    this.setState({configurationSelected:true});
    console.log('Dashboard store loaded');

    var dashboardLayout = deviceManager.getDashboard();
    this.loadControls(dashboardLayout);
    this.setState({loaded:true});
  },

  loadControls: function(layout){

    var controlList = {};

     _.each(layout.tab[0].controls,function(item){
        var control = controlLoader.getControl(item.guid);

            control.layout=item.layout;
            control.Id=item.id;
            controlList[control.Id]=control;
    });

    this.setState({dashboardControlsList: controlList});

  },

  saveDashboard: function(layout){
    //From react gridlayout object
        let dashboardData = {
              name: 'default',
              tab: [{ name: "default",
                      controls: _.map(layout,function(l){
                          let ctrl = this.state.dashboardControlsList[l.i];
                          ctrl.layout={w:l.w,h:l.h,x:l.x,y:l.y}
                          return {
                                  id: ctrl.Id,
                                  guid: ctrl.guid,
                                  name: ctrl.name,
                                  type: ctrl.type,
                                  layout: ctrl.layout
                                  }
                        }.bind(this))
                   }]
      };

      deviceManager.saveDashboard(dashboardData);
      //Save Async
      return false;
  },

  controlChanged: function(){

  },

  hideAddControl: function(){
    this.setState(
      {
        addControlVisible: false
      });
  },
  showAddControl: function(){
    this.setState(
      {
        addControlVisible: true
      });
  },

  addItem: function (guid) {
    var controls = this.state.dashboardControlsList;
    var control = controlLoader.getControl(guid);

    control.Id = Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    control.layout = {x:0,y:0,w:control.defaultSettings.min_size.w,h:control.defaultSettings.min_size.h};
    controls[control.Id]=control;

    this.setState({
      dashboardControlsList: controls
    });
  }
});

module.exports=DashboardStore;
