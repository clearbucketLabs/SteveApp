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
              guid: "951b91f4-01b6-4945-b39d-fa5fc16dce40",
              description: "",
              type: "sensor",
              control: SensorList,
              defaultSettings: {
                          min_size: {h: 1, w:2}
                        }
              };


module.exports=control;
