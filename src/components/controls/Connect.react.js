var React = require('react/addons'),
    classNames = require('classNames');


var SerialConnection = React.createClass({

  getInitialState: function(){
    return {
      portOpen: SteveApi.isPortOpen()
    }
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
        <ul className="portConnect">
          <li><a className="btn btn-success" onClick={this.onHandleClick}>{connected ? 'Connected' : 'Connect'}</a></li>
          <li>{SteveApi.port()}</li>
        </ul>
    );
  }
});

module.exports = SerialConnection;
