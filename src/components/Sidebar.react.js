var
    Menu = remote.require('menu'),
    MenuItem = remote.require('menu-item'),
    Router = require('react-router'),
    classNames = require('classNames'),
    metrics = require('../utils/MetricsUtil'),
    SerialConnection = require('./SerialConnection.react');

var SideBar = React.createClass({
  mixins: [Router.Navigation],

  componentDidMount: function () {
  },

  handleAutoUpdateClick: function () {
  },

  render: function () {

    return (
      <div className="main_sidebar">
      <div className="sideBarLogo"><span>S T E V E</span></div>
        <ul className="list-group">
          <li>p: {SteveApi.port()}</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li>Test</li>
          <li><SerialConnection /></li>
        </ul>
     </div>
    );
  }
});

module.exports = SideBar;
