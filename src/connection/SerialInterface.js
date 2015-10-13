/*
Serial Device interface
Wrapper to provide standardized events around an existing implemetnation.
*/


let settings = require('../settings'),
    SerialPort = require('serialport').SerialPort,
    SerialPortParsers = require('serialport').parsers,
    events = require('events');

//module global scope
let _name = "serial";

let deviceInterface = function(){

//module private scope
  let _serialPort = NaN,
      _portOpen = false,
      _portname = "",
      _buffersize = 1,
      _rsync = '',
      _tsync = '',
      _baudrate = 115200;

      events.EventEmitter.call(this);

      return {

      init: function(port,baudrate,buffersize){

        if(!_portOpen){
          _portname=port;
          _baudrate=baudrate;
          _buffersize=buffersize;
          _serialPort = new SerialPort(_portname, {
            baudrate: _baudrate,parser: SerialPortParsers.byteLength(_buffersize)}, false); // this is the openImmediately flag [default is true]
        }
      },

      getType: function(){
        return _name;
      },

      getPort: function () {
        return _portname;
      },
      setRSync: function(sync){
          _rsync=sync;
      },

      setTSync: function(sync){
          _tsync=sync;
      },

      onDataReceive: function(data){

          this.emit('device.dataReceived',data);
          return;

      }.bind(this),

      send: function(data){
        _serialport.write(data, function(err, results) {
          console.log('err ' + err);
          console.log('results ' + results);
        });
      },

      isOpen: function(){
        return _portOpen;
      },

      open: function(){

      if (!_portOpen){
          _serialPort.open(function (error) {
              if (error) {
                    console.log('failed to open: '+error);
                    this.emit('device.connectionFailed',error);
                } else {
                  console.log('Port Open');
                  _portOpen=true;
                  _serialPort.on('data', this.onDataReceive);
                  _serialPort.on('close',this.onClose);

                  this.emit('device.connected');
            }
          }.bind(this));
        }
      },

      onClose: function(){

        let unexpected=false;

          if (_portOpen == false){
            console.log('Port Closed By User');
          }else{
            console.log('Port Closed Unexpectedly');
            unexptected=true;
            _portOpen=false;
          }

          _serialPort.removeListenter('data',this.onDataReceive);
          _serialPort.removeListener('close',this.onClose);

          this.emit('device.connectionClosed',unexptected);


      }.bind(this),

      close: function(){
          _serialPort.close(function(){
            _portOpen=false;
          }.bind(this));
      }
    }
};

deviceInterface.__proto__ = events.EventEmitter.prototype;


module.exports = deviceInterface;
