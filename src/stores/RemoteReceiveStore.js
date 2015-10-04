/*

 - Receive's data from specified device interface
 - Cache and record data events
 - Wait for parser match - parser will mapdata
 - Use time tracking to determine gap between data reception like a timeout
 - Store all raw data as a single stream of data that can be ran be re-ran
 - through the parser.

 - Stores structured data from parser also.


*/

var alt = require('../alt');
var actions = require('./../actions/interfaceActions');

/* Module Scope */
let parseData=function(){

}


let cacheData=function(){

}

/* Cache up to xxxxx of data, shift data once full.  everything would be stored in persistent storage anyway */
let data_cache = [];


let RemoteReceiveStore = alt.createStore({

  _deviceInterface: undefined,
  _mapper: undefined,
  _parser: undefined,
  displayName: 'RemoteReceiveStore',
  bindListeners: {
    onDataReceive: actions.sendData,
    onConnectionOpened: actions.connectionOpened,
    onConnectionClosed: actions.connectionClosed,
    onConnectionError: actions.connectionError
  },


  onDataReceive: function(event){
      //cacheData(event);
    //  if (!parser.parse(event.data){

    //  }
  },

  onConnectionOpened: function(event){
      //Send to listeners

  },

  onConnectionError: function(event){
    //Send to listeners

  },


  state: {},


  publicMethods: {
    setInterface: function(deviceInterface){

    }
  },
});

module.exports=RemoteReceiveStore;
