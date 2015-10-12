'use strict'

/*
   Arrow Navigation
*/


var React = require('react');
var EventEmitter = require('events').EventEmitter;
var intervalId=null;
var baic_navigation = React.createClass({

    HandleMouseUp: function (event){
        /* Mouse UP! */
    },

    HandleForwardHold: function(event){
      //send command at an interval

    },

    HandleStopClick: function(event){

    },

    HandleLeftClick: function (event){
    //  SteveApi.api_moveLeft();
    },
    HandleRightClick: function(event){
      SteveApi.api_moveRight();
    },
    render: function(){
        return (
          <div className="basicNavigation">
            <div>
              <a className="Forward" onMouseDown={this.HandleForwardHold} onMouseUp={this.HandleMouseUp}>
                <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
              </a>
            </div>
            <div>
              <a className="Left" onClick={this.HandleLeftClick}>
                <span className="glyphicon glyphicon-arrow-left" aria-hidden="true"></span>
              </a>

              <a className="Right" onClick={this.HandleLeftClick}>
                <span className="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>
              </a>
            </div>

            <div>
              <a className="Backward" onClick={this.HandleLeftClick}>
                <span className="glyphicon glyphicon-arrow-down" aria-hidden="true"></span>
              </a>
              </div>
          </div>
        );
    }
});

var control = {
                name: "Basic Navigation",
                description: "",
                type: "command",
                control: baic_navigation,
                defaultSettings: {
                                  min_size: {h: 6, w:2}
                                  },
                commands: [ {name: "up",behaviour:"", hasValue:false },
                            {name: "down",behaviour: "", hasValue:false },
                            {name: "left",behaviour: "", hasValue:false },
                            {name: "right",behaviour: "", hasValue:false }
                          ],
              };

module.exports = control;
