var React = require('react/addons'),
    Router = require('react-router'),
    serialPort = require('serialport');

var Preferences = React.createClass({
  mixins: [Router.Navigation],
  getInitialState: function () {
    return {
      selectedPort: ''
    };
  },
  handleGoBackClick: function () {
    this.goBack();
  },
  render: function () {
    return (
      <div className="preferences">
        <div className="preferences-content">
          <a onClick={this.handleGoBackClick}>Go Back</a>
          <div className="title">App Settings</div>

          <div className="option">
            <div className="option-name">
               Serial Port
            </div>

            <div className="option-value">
              <SerialPortSelector/>
            </div>

          </div>

        </div>
      </div>
    );
  }
});

var PortsList = React.createClass({

  getInitialState: function(){
    return {data: this.props.selectedport};
  },

  render: function(){
    var selectedport = this.data;

    var options = this.props.data.map(function (port) {
        return (
          <option key={port.comName} value={port.comName}>{port.comName}
          </option>
        );
      });

  return (<select value={selectedport} className="portList" onChange={this._onSelect}>
              {options}
            </select>);
  },

  _onSelect: function(event){
  //  SteveApi.setPort(event.target.value);
    this.setState({data: event.target.value});
  }

});

var SerialPortSelector = React.createClass({

  getInitialState: function() {
      return {data: []};
    },

  componentDidMount: function() {
    var portlist = [];

    serialPort.list(function (err, ports) {

      ports.forEach(function(port) {
        portlist.push(port);
      });


      this.setState({data: portlist});

    }.bind(this));

},
  render: function(){

          return (
            <PortsList data={this.state.data} selected={this.props.selectedport}/>
          );
    }
  });

module.exports = Preferences;
