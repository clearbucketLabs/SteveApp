let react = require('react'),
    deviceManager = require('./../lib/deviceManager'),
    _ = require('lodash'),
    deviceActions = require('./../actions/deviceActions');


//Home!
var Home = React.createClass({
  mixins: [Router.Navigation],
  getDefaultProps: function(){
      return {};
  },

  getInitialState: function(){
      return {};
  },

  componentDidMount: function(){
    this.setState({devices: deviceManager.getDevices()})
  },

  selectDevice: function(name){
    //device is folder name, technically.

    let loadedDevice = deviceManager.loadDevice(name);

    if (loadedDevice !== false){
        deviceActions.deviceLoaded(loadedDevice);
        this.transitionTo('dashboard');
    }
  },

  createDeviceList: function(){
    var that=this;
    return  _.map(this.state.devices,function(device){
          return (<li key={device.name}><a href='/about' onClick={that.selectDevice.bind(that,device.device)}>{device.name}</a></li>)
      });
  },

  render: function(){
      return(
        <div>
          <h1>Select or Create a Configuration</h1>
          <ul>
              {this.createDeviceList()}
              <li><a>Create a new device </a></li>
            </ul>
        </div>
      );
  }

});

module.exports=Home;
