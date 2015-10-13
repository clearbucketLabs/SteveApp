let settings = require('../settings'),
    actions = require('../actions/interfaceActions'),
    events = require('events');

let _buffersize = 1,
    _name = "dummy",
    _portOpen = false;


let packets = [[0xAA,0x00,0x01,0x02,0x00,0x02],
               [0xAA,0x00,0x10,0x05,0x80,0x00,0x00,0x00,0x00]
              ];

let packetIndex = 0;


let dummyInterface = function(){


  events.EventEmitter.call(this);
  let _interval = 5000; //5 sec
  let _rsync ='';
  let _tsync ='';

  let sendSomething = function(){
      let that = this;
      let packet = packets[packetIndex];
      let chunks = _.chunk(packet,buffersize);

      _.each(chunks,function(d){
          that.emit('device.dataReceived',d); //emit via event...
      });

      packetIndex++;

      if(packetIndex > (packets.length-1)){
        packetIndex=0;
      }
  }


return {

      init: function(interval){
          _interval = interval;
      },
      getType: function(){
        return _name;
      },
      setRSync: function(sync){
        _rsync=sync;
      },
      setTSync: function(sync){
        _tsync=sync;
      },
      isOpen: function(){
        return _portOpen;
      },

      send: function(){
          //send something...
      },

      open: function(){

          if (!_portOpen){

              this.emit('device.connected');

              setInterval(function(){
                    sendSomething.call(this);
              }.bind(this),5000);

          }
      },
      close: function(){
          _portOpen = false;
          this.emit('device.connectionClosed',false);
      }
  };
}

dummyInterface.__proto__ = events.EventEmitter.prototype;

module.exports = dummyInterface;
