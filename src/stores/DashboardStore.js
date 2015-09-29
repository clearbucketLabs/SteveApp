
var alt = require('../alt');
var actions = require('./../actions/dashboardActions');

var DashboardStore = alt.createStore({
  displayName: 'DashboardStore',

  bindListeners: {
    addItem: actions.addControl,
    showAddControl: actions.showAddControl,
    hideAddControl: actions.hideAddControl
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

    controls.push(item);

    this.setState({
      dashboardControlsList: controls
    });
  }
});

module.exports=DashboardStore;
