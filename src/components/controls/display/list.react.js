//Sensor List - Discovered Sensors show up here....

var SensorList = React.createClass({
  getInitialState: function(){

  },
  render: function () {
    return (
      <div className="sensorlist">

      </div>
    );
  }
});

var control = {
              name: "Sensor list",
              description: "",
              type: "sensor",
              control: SensorList,
              defaultSettings: {
                                  min_size: {h: 1, w:2}
                               }
              };

module.exports=control;
