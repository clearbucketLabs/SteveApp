/*
 *  Device Manager, Initializes a device.
 */
 let _ = require('lodash'),
     fs = require('fs'),
     path = require('path'),
     SerialInterface = require('./../connection/serialInterface'),
     responseParser = require('./../lib/Parser');


  let deviceConfigurationPath = path.resolve(__dirname,'..',"robots"),
      loaded=false,
      started=false,
      deviceLoaded='',
      _mapping={},
      connections={},
      _dashboard={},
      _config,
      _devices=[];



  function validate(config){
      //Check required nodes      //Check values
      //schema check, duplicate names...
      return true;
  }

  function openDeviceConfig(name){

    var config;

    try {
       config=JSON.parse(fs.readFileSync(path.join(deviceConfigurationPath,name,'config.json'), 'utf8'));
    } catch (err) {
        return err;
    }

    if(validate(config)){
      return config
    }

    throw "Validation Error";
    return false;
  }

  function deviceList(){

    let folders = fs.readdirSync(deviceConfigurationPath).filter(function(file) {
          let filepath = path.join(deviceConfigurationPath,file);
          return fs.statSync(filepath).isDirectory();
        });

    return folders;

  }

  function loadConfiguration(name,type){

    var file;
    var configurationFilePath=path.join(deviceConfigurationPath,name,type+'.json');

    if(!fs.existsSync(configurationFilePath)){
      return {};
    }

    try {
      file = fs.readFileSync(configurationFilePath, 'utf8')
    } catch (err) {
      return {};
    }

    return JSON.parse(file);

  }

  function saveConfiguration(name,data,type){
    var configurationFilePath=path.join(deviceConfigurationPath,name,type+'.json');

    fs.writeFile(configurationFilePath, JSON.stringify(data), function (err) {
      if (err) throw err;
        console.log(name + '\'s' + type + ' saved!');
    });
  }

module.exports = {

      init: function(){
        //Cache device list

        let devices = deviceList();

        _devices = _.map(devices,function(name){
            return this.deviceInfo(name);
        }.bind(this));

      },
      hasDashboard: function(){
          if(_dashboard == {})
            return false;

        return true;
      },

      saveDashboard: function(data){
        if(loaded){
          _dashboard=data;
          saveConfiguration(deviceLoaded,data,'dashboard');
        }
      },

      saveMapping: function(data){
        if(loaded){
          _mapping = data;
          saveConfiguration(deviceLoaded,data,'mapping');
        }
      },
      getDashboard: function(){
        if(loaded){
          return _dashboard;
        }
      },
      getMapping: function(){
        if(loaded){
          return _mapping;
        }
      },

      getDevices: function(){
          return _devices;
      },

      deviceInfo: function(name){
              //read configuration file...
            var config=openDeviceConfig(name);

           if(config !==false){
             return{device: name, name: config.name, version: config.version, description: config.description}
           }

           return {device: name, name: name,version: 0,description: 'Invalid config'};
      },


      stop: function(){

        if(started){
          for(conn in connections){
              conn.deviceInterface.stop();
          }

          started=false;
        }

      },

      unloadDevice: function(){

        this.stop();
        connections={};
        deviceLoaded='';
        loaded=false;

      },

        //Load configuration and create interfaces for connections
      loadDevice: function(name){

        var config = openDeviceConfig(name);

        if(config === false){
          return false;
        }


        _.each(config.connections,function(deviceInterface){

                  if(deviceInterface.type==='serial'){
                        let SerialPort = new SerialInterface();

                        if(deviceInterface.r_sync.length > 0){
                            SerialPort.setRSync(deviceInterface.r_sync);
                        }

                        if(deviceInterface.t_sync.length > 0){
                          SerialPort.setTSync(deviceInterface.t_sync);
                        }

                        let responseRuleData;

                          if(!_.isUndefined(config.responses)){
                            responseRuleData = _.find(config.responses,{"interface":deviceInterface.name});
                          }

                        connections[deviceInterface.name] = {
                                                              deviceInterface: SerialPort,
                                                              configuration: deviceInterface,
                                                              responseParser: new responseParser(responseRuleData),
                                                              connected:false
                                                        };
                      }
                }
      );
          _config = config;
          _dashboard = loadConfiguration(name,'dashboard');
          _mapping = loadConfiguration(name,'mapping');

          loaded=true;
          deviceLoaded = name;


         return connections;
    }
}
