//Handle Sensor Discovery and State history


var SensorSystem = function sensor_sys(){


            var Sensors = {}; //Sensor set

            function storeState(){

            }

            function getState(){

            }

            function loadSensors(){

            }


            //Handles new sensor data event
            function parseSensor(){


            }

            loadState(); //Load Last State if Any...

            return ({
              getSensorList: function(){

              },

              getSensorData: function(sensor_id,start_date,end_date){


              },

              addSensor: function(){

              },
              getFormatter: function(name){

              },
              parseSensorData: function(sensorid, data){
                parseSensor();
              }

            });
}();
