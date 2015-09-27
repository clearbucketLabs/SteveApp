var alt = require('../alt');

var ControlDataActions=alt.createActions({
                    /* Got something for this control,sensor */
                    dataReceived: function (data,control) {
                      this.dispatch({
                          controlId: control,
                          data:data
                      });
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

module.exports = ControlDataActions;
