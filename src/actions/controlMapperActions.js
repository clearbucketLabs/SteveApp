var alt = require('../alt');

var ControlMapperActions=alt.createActions({

                    saveMapping: function (data,control) {
                      this.dispatch();
                    },
                    /*  Trigger mapped command  */
                    triggerCommand: function (controlId,command,command_data){

                      this.dispatch({
                        controlId: controlId,
                        command: command,
                        data: command_data
                      });
                    },
});

module.exports = ControlMapperActions;
