/*
 Load Controls dynamically since we'll write them with other information and we don't want to
 manually 'require' them were needed.  this will handle loading and returning them.
*/
'use strict'

let  _  = require('lodash'),
    path = require('path'),
    fs = require('fs');

let loadedControls = [];
let loaded = false;



let ControlLoader = {
      /* Load react controls from file system via require dynamically
         return true if successful, false if error.
         hard errors logged to the console.
      */
      loadControls: function(controlpath){

        let fullControlPath =  path.resolve(__dirname,'..',controlpath)

          console.log("Loading Controls from " + fullControlPath);

            try{

              let folders = fs.readdirSync(fullControlPath).filter(function(file) {
                    let filepath = path.join(fullControlPath,file);
                    return fs.statSync(filepath).isDirectory();
                  });

              folders.push(""); //start folder...

              _.forEach(folders,function(n,key){

                  let currentPath = path.join(fullControlPath,n);
                  let controlList=fs.readdirSync(currentPath).filter(function(file){
                      let filepath = path.join(currentPath,file);
                      return !fs.statSync(filepath).isDirectory();
                  });

                  _.forEach(controlList,function(n,key){
                      let ctrl = require(path.join(currentPath,n));
                      ctrl._filename=n;
                      loadedControls.push(ctrl);
                      console.log("Value: " + n);
                  });
                });

              loaded=true;
              //this.emitter.emit('loaded');
            }catch (e){
              console.log(e.message);
            }
      },

      getControlsByType: function(type){

            if(loadedControls.length > 0){
                return _.find(loadedControls,{'type': type});
            }else{
              return undefined;
            }
      },
      getControl: function(guid){

        if(loadedControls.length > 0){
            return _.find(loadedControls,{'guid': guid});
        }else{
          return undefined;
        }
      },
      allControls: function(){
          return loadedControls;
      }
}

module.exports = ControlLoader;
