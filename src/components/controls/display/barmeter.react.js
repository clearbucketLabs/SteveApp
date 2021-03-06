/*
 *  Bar meter display
 *
 */
var react = require('react');
var barmeter = react.createClass({

    getDefaultProps:function(){
      return{
          value: "",
          min_level: 0,
          max_level: 200
        }
    },

    componentDidMount: function(){

    },
    render:function(){
        <div>
          <span>Bar Meter</span>
       </div>
    }
});

var control = {
              name: "BarMeter",
              guid: "d73c851a-ecdf-4eda-adac-4645b512085f",
              description: "",
              type: "sensor",
              control: barmeter,
              defaultSettings: {
                                  styles:{},
                                  min_size: {h: 1, w:2}
                               }
              };

module.exports=control;
