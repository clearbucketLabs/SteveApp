var alt = require('../alt');

var DashboardActions=alt.createActions({

                    showAddControl: function(){
                      this.dispatch();
                    },
                    hideAddControl: function(){
                      this.dispatch();
                    },
                    addControl: function (dashboardControl) {
                      this.dispatch(dashboardControl);
                    },
                    removeControl: function (dashboardControl){
                      this.dispatch(dashboardControl);
                    },
                    saveDashboard: function (layout){
                      this.dispatch(layout);
                    },
});

module.exports = DashboardActions;
