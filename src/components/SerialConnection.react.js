var
    Menu = remote.require('menu'),
    MenuItem = remote.require('menu-item'),
    Router = require('react-router'),
    classNames = require('classNames'),
    metrics = require('../utils/MetricsUtil');

var SerialConnection = React.createClass({

  getInitialState: function(){
    return {portOpen: SteveApi.isPortOpen()}
  },

  componentDidMount: function () {
      SteveApi.on('sApi.portState',function(){
          this.setState({portOpen: SteveApi.isPortOpen()});
      }.bind(this));
  },

  onHandleClick: function(){

    if (SteveApi.isPortOpen())
    {
      SteveApi.closePort(function(){});
    }else{
      SteveApi.openPort(function(){});
    }
  },

  render: function () {

    var connected = SteveApi.isPortOpen();

    return (
        <div className="portConnect">
          <a className="btn btn-success" onClick={this.onHandleClick}>{connected ? 'Disconnect' : 'Connect'}</a>
        </div>
    );
  }
});

module.exports = SerialConnection;
