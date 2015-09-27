var alt = require('../alt');

var DashboardActions=alt.createActions({

                    addControl: function (dashboardControl) {
                      this.dispatch(dashboardControl);
                    },
                    removeControl: function (dashboardControl){
                      this.dispatch(dashboardControl);
                    },
                    saveDashboard: function (dashboardControls){
                      this.dispatch(dashboardControls);
                    }
});

module.exports = DashboardActions;
