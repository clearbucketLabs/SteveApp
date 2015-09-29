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
        SteveApi.api_stop();
        clearInterval(this.intervalId);
        console.log("mouse up " + this.intervalId);
    }.bind(this),

    HandleForwardHold: function(event){
      //send command at an interval
      var speedValue = 0;

      this.intervalId =  setInterval(function(){
          //Accelerate
          SteveApi.api_moveForward(speedValue);
          speedValue *= 2;
          console.log("mouse down");
        },1000);
    }.bind(this),

    HandleStopClick: function(event){

    },
    HandleLeftClick: function (event){
      SteveApi.api_moveLeft();
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
                                  min_size: {h: 1, w:2}
                               },
              events: [
                          "up",
                          "down",
                          "left",
                          "right",
                      ]
              };

module.exports = control;
