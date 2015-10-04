var settings = require('../settings'),
    SerialPort = require('serialport').SerialPort,
    SerialPortParsers = require('serialport').parsers,
    actions = require('../actions/interfaceActions');



module.exports = {
      serialport: NaN,
      portOpen: false,
      portname: "",
      baudrate: 115200,

      init: function(port,baudrate,buffersize){
          this.portname=port;
          this.baudrate=baudrate;
      },

      getPort: function () {
        return this.portname;
      },

      radioType: function(){
        return this.radioType;
      },

      onDataReceive: function(data){

      //Send...
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

      openPort: function(){

      if (!this.portOpen){

        this.serialPort = new SerialPort(this.portname, {
          baudrate: this.baudrate,parser: SerialPortParsers.byteLength(buffersize)}, false); // this is the openImmediately flag [default is true]

          this.serialPort.open(function (error) {
              if (error) {
                    console.log('failed to open: '+error);
                    interfaceActions.connectionError(error,this);
                } else {
                  console.log('Port Open');
                  this.portOpen=true;
                  this.serialPort.on('data', this.onDataReceive);
                  this.serialPort.on('close',this.onClose);

                  interfaceActions.connectionOpened(this); //send action.

            }
          }.bind(this));
        }
      },
      onClose: function(){

        let unexpected=false;

          if (this.portOpen == false){
            console.log('Port Closed By User');
          }else{
            console.log('Port Closed Unexpectedly');
            unexptected=true;
          }

          this.serialPort.removeListenter('data',this.onDataReceive);
          this.serialPort.removeListener('close',this.onClose);

          interfaceActions.connectionClosed(unexptected,this);

      }.bind(this),

      closePort: function(){
          this.serialPort.close(function(){
            this.portOpen=false;
          }.bind(this));
      }
};
