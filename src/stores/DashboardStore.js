
var alt = require('../alt');
var actions = require('./../actions/dashboardActions');

var DashboardStore = alt.createStore({
  displayName: 'DashboardStore',

  bindListeners: {
    addItem: actions.addControl
  },

  state: {
    dashboardControlsList: []
  },

  publicMethods: {
    hasControls: function () {
      return !!this.getState().dashboardControlsList.length;
    }
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
