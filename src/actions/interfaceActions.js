var alt = require('../alt');

module.exports=alt.createActions({

                    sendData: function(data, deviceInterface){
                      this.dispatch({
                              data: data,
                              origin: deviceInterface
                            });
                    },
                    connectionOpened: function(deviceInterface){
                      this.dispatch({
                                      origin:deviceInterface
                                   });
                    },
                    connectionClosed: function (unexpected,deviceInterface) {
                      this.dispatch({
                        unexpected: unexpected,
                        origin: deviceInterface
                      });
                    },
                    connectionError: function (e,deviceInterface){
                      this.dispatch({
                                  errorDetails: e,
                                  origin: deviceInterface
                                  });
                    }
});
