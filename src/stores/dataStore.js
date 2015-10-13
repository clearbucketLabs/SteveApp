/*

 - Receive's data from specified device interface
 - Cache and record data events
 - Wait for parser match - parser will mapdata
 - Use time tracking to determine gap between data reception like a timeout
 - Store all raw data as a single stream of data that can be ran be re-ran
 - through the parser.

 - Stores structured data from parser also.


*/

let alt = require('../alt'),
    actions = require('./../actions/interfaceActions'),
    controlDataActions = require('./../actions/controlDataActions'),
    deviceActions = require('./../actions/deviceActions'),
    dashboardActions = require('./../actions/dashboardActions'),
    _ = require('lodash');


/* Module Scope */
let route=function(){

}

let cacheData=function(){

}

/* Cache up to xxxxx of data, shift data once full.  everything would be stored in persistent storage anyway */
let data_cache = [];

let RemoteReceiveStore = alt.createStore({

  _mapper: undefined,
  _parser: undefined,
  _deviceLoaded: false,
  displayName: 'DataStore',
  bindListeners: {
    onControlCommand: controlDataActions.triggerCommand,
    onDeviceLoaded: deviceActions.deviceLoaded,
    onDashboardUnloading: dashboardActions.unloading
  },

  onDashboardUnloading: function(){

    //Unload/Cleanup
      if(this._deviceLoaded){
        this._deviceLoaded=false;
      }
  },

  onDeviceLoaded: function(){

    //We loaded a device configuration, lets wire it up
    console.log('data store device loaded');

    this._deviceLoaded=true;

  },

  onControlCommand: function(command){

  },

  onDataReceive: function(dataEvent){

    if(dataEvent.origin === _interface){

    }
  },

  onConnectionOpened: function(event){
      //Send to listeners

  },

  onConnectionError: function(event){
    //Send to listeners

  },


  state: {},

  publicMethods: {
    init: function(deviceInterface){

          if(_.has(deviceInterface,'getType') && typeof deviceInterface.getType === 'function'){
              let device_type = deviceInterface.getType();

              if(device_type !== 'serial'){
                  throw "device not supported";
              }

          }else{
            throw "Invalid device interface";
          }

          _deviceInterface = deviceInterface;
    }
  },
});

module.exports=RemoteReceiveStore;
