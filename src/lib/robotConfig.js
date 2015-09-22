/*
 *  Device / Robot Configuration Management
 */
 var _ = require('lodash'),
     fs = require('fs'),
     path = require('path');

  var path = "../../robots",

  schemaConfig = {
        name: "",
        interface: [{
          name: "string",
          type: "serial,network,other",
          data_format: "raw",
          readonly:false,
          r_sync:"",
          t_sync:"",
          checksum:"bool"}
        ],
  },

  settingsjson = {},
  loaded=false;


  function validate(){
      //Check required nodes      //Check values
      //schema check
  }

  function openConfig(name){
    try {
       settingsjson=JSON.parse(fs.readFileSync(path.join(__dirname,path,name+'.json'), 'utf8'));
    } catch (err) {
        loaded=false;
        return err;
    }
    loaded=true;
    return true;
  }


module.exports = {

      list: function(){

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
