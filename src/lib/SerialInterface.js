var settings = require('../settings'),
    SerialPort = require('serialport').SerialPort,
    SerialPortParsers = require('serialport').parsers,
    Emitter = require('emitter');



    if (localStorage.getItem('s_api.port') === null) {
        localStorage.setItem('s_api.port', "none");
    }

    if (localStorage.getItem('s_api.radiotype') === null) {
        localStorage.setItem('s_api.radiotype', "xbee 2 serial");
    }


var sApi = {

      sApi_header: new Uint8Array([0x90,0x5D,0x5D]),
      serialport: NaN,
      portOpen: false,
      sApi_rcvbuffer: new Uint8Array(128), //Buffer...
      gotheader: false,
      length: -1,
      packet_id: 0x00,
      rcv_count: 0,

      setPort: function (portname){
        localStorage.setItem('s_api.port', portname);
      },

      port: function () {
        return localStorage.getItem('s_api.port');
      },

      radiotype: function(){
        return localStorage.getItem('s_api.radiotype');
      },

      dataEndianess: function(){
        //big/little
      },

      api_moveForward: function(){
          if(sApi.isPortOpen()){
            return;
          }
      },

      api_moveBackwards: function(){
          return;
      },

      api_turnLeft: function(){
        return;
      },

      api_turnRight: function (){
        return;
      },
      api_stop: function (){
          if(sApi.isPortOpen()){
            var command = new Buffer([0x90,0x5D,0x5D,0x01,0x00,0x00]);
            this.writePort(command);
          }
      },
      api_setSettings: function(){
        return;
      },

      onDataReceive: function(data){

          data = data[0];

        if(!sApi.gotheader){
            if(data == 0xAA && sApi.rcv_count == 0){
              sApi.rcv_count++;
              return;
            }

            if(data == 0x00 && sApi.rcv_count == 1){
              sApi.rcv_count++;
              return;
            }else{
              if(sApi.rcv_count == 1){
                sApi.rcv_count ==0;
                return;
              }
            }

            if(sApi.rcv_count == 2){
              sApi.rcv_count++;
              sApi.packet_id = data;
              sApi.gotheader=true;
              console.log("Got Header \r\n");

            }

          }else{
              //Got header
              if (sApi.length == -1){
                sApi.rcv_count = 0;
                sApi.length = data;
                return;
              }


            if (sApi.rcv_count == sApi.length){
                console.log(sApi.sApi_rcvbuffer.length);
               switch (sApi.packet_id) {
                 case 0x10:
                      //sensor data
                  sApi.emit("sApi.sensorEvent",{
                            sensor_id: sApi.sApi_rcvbuffer[0],
                            data: sApi.sApi_rcvbuffer,
                            length: sApi.length}
                        );
                   break;

                 default:

                 sApi.emit("sApi.commandResponse", {
                        cmd: sApi.packet_id,
                        data: sApi.sApi_rcvbuffer,
                        length: sApi.length});

               sApi.rcv_count = 0;
               sApi.gotheader = false;
               sApi.length = -1;
               sApi.sApi_rcvbuffer = [];
            }
          }else{
            console.log(data);
            sApi.sApi_rcvbuffer[sApi.rcv_count++];
          }
        }
          return;

      },
      writePort: function(data){
        this.serialport.write(data, function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
        });
      },

      isPortOpen: function(){
        return this.portOpen;
      },

      openPort: function(callback){

      if (!this.portOpen){

        this.serialPort = new SerialPort(this.port(), {
          baudrate: 115200,parser: SerialPortParsers.byteLength(1)}, false); // this is the openImmediately flag [default is true]

          this.serialPort.open(function (error) {
              if ( error ) {
                  console.log('failed to open: '+error);
                  alert("Can't open port " + error);
                } else {
                  sApi.portOpen=true;
                  sApi.serialPort.on('data', sApi.onDataReceive);

                  console.log('Port Open');

                  sApi.serialPort.on('close', function(){
                      //It closed! doh!
                      sApi.portOpen = false;
                      console.log('Port Closed');
                      sApi.emit("sApi.portState");
                  });

                  sApi.emit("sApi.portState");

                  if (typeof callback == "function") callback();
                }
          });
        }
      },

      closePort: function(callback){
          this.serialPort.close(function(){
            sApi.portOpen=false;
            if (typeof callback == "function") callback();
          });

      }
};

Emitter(sApi);

module.exports = sApi;
