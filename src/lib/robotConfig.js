/*
 *  Device / Robot Configuration Management
 */
 var _ = require('lodash'),
     fs = require('fs'),
     path = require('path');

  var configurationPath = "../../robots",


  settingsjson = {},
  loaded=false;


  function validate(){
      //Check required nodes      //Check values
      //schema check
  }

  function openConfig(name){
    try {
       settingsjson=JSON.parse(fs.readFileSync(path.join(__dirname,configurationPath,name+'.json'), 'utf8'));
    } catch (err) {
        loaded=false;
        return err;
    }
    loaded=true;
    return true;
  }


module.exports = {

      list: function(){

        let deviceConfig=fs.readdirSync(configurationPath).filter(function(file){
            return file.match('.config.json');
        });

        return _.map(deviceConfig,function(filename){

          let file = JSON.parse(fs.readFileSync(path.join(__dirname,configurationPath,filename), 'utf8'));
                return {
                   name: file.name,
                   file: filename
                }
        });
      },

      load: function(name){

        var status = this.openConfig(name);

        if(status !== true){
          return status;
        }

        if(this.validate()){
          return true;
        }

         return false;
      },

      addRule: function(){

      },

      addConnector: function(name,type,readonly){

      },

      connectors: function(){

      }
}
