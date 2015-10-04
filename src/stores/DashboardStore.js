
var alt = require('../alt');
var actions = require('./../actions/dashboardActions');
var _ = require('lodash');
var utils = require('./../utils/Util');

var DashboardStore = alt.createStore({
  displayName: 'DashboardStore',
  loadedDashboard: '',
  bindListeners: {
    addItem: actions.addControl,
    showAddControl: actions.showAddControl,
    hideAddControl: actions.hideAddControl,
  //  loadLayout: actions.loadLayout,
  //  saveDashboard: actions.saveDashboard
  },

  state: {
    dashboardControlsList: [],
    addControlVisible: false
  },

  publicMethods: {
    hasControls: function () {
      return !!this.getState().dashboardControlsList.length;
    }
  },

  loadLayout: function(name){

  },

  saveDashboard: function(layout){
    //From react gridlayout object
    let dashboardData = {
          name: this.loadedDashboard,
          tab: [{ name: "default",
                  controls: _.map(layout,function(l){
                      let ctrl = this.findControl(l.i);
                      return {
                              controlId: ctrl.control.Id,
                              name: ctrl.control.name,
                              type: ctrl.control.type,
                              layout: {
                                       w:l.w,
                                       h:l.h,
                                       x:l.x,
                                       y:l.y
                                      }
                              }
    })
  }]
  };

      //Save Async
      utils.saveDashboardConfiguration(this.loadedDashboard,dashboardData);

  },

  findControl:function(id){
    return _.return(_.find(this.state.dashboardControlList,id),'Id');
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

  addItem: function (control) {
    var controls = this.state.dashboardControlsList;
    control.Id = Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    controls.push(control);

    this.setState({
      dashboardControlsList: controls
    });
  }
});

module.exports=DashboardStore;
