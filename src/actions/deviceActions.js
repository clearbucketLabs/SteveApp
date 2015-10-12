var alt = require('../alt');
var deviceActions=alt.createActions({

                    deviceLoaded: function(name,connections){
                      this.dispatch({name:name,connections:connections});                    
                    },
                    deviceUnloaded: function(name){
                      this.dispatch({name:name})
                    }
});

module.exports = deviceActions;
