var React = require('react/addons'),
    classNames = require('classNames');


var connection = React.createClass({

  getInitialState: function(){
    return {
      portOpen: false
    }
  },

  componentDidMount: function () {
    },

  onHandleClick: function(){

  },

  render: function () {

    var connected = this.state.portOpen;

    return (
        <ul className="portConnect">
          <li><a className="btn btn-success" onClick={this.onHandleClick}>{connected ? 'Connected' : 'Connect'}</a></li>
          <li></li>
        </ul>
    );
  }
});

module.exports = connection;
