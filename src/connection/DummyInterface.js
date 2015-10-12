let settings = require('../settings'),
    actions = require('../actions/interfaceActions');


let _buffersize = 1,
    _name = "dummy",
    _portOpen = false;


let packets = [[0xAA,0x00,0x01,0x02,0x00,0x02],
               [0xAA,0x00,0x10,0x05,0x80,0x00,0x00,0x00,0x00]
              ];

let packetIndex = 0;

let sendSomething = function(){

    let packet = packets[packetIndex];
    let chunks = _.chunk(packet,buffersize);


    _.each(chunks,function(d){

    });

}

module.exports = {

      init: function(){
      },
      getType: function(){
        return _name;
      },

      isPortOpen: function(){
        return _portOpen;
      },

      openPort: function(){

          if (!_portOpen){
              setInterval(function(){
                    sendSomething.call(this);
              }.bind(this),10000);

          }
      },
      closePort: function(){
          _portOpen = false;
      }
};
