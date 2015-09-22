var React = require('react/addons'),
    Router = require('react-router'),
    BotNav = require('./Nav.react'),
    Dashboard = require('./Dashboard.react');


var Home = React.createClass({
  mixins: [Router.Navigation],
  handleGoBackClick: function () {
    this.goBack();
  },
  render: function () {
    return (
      <div className="home">
        <div className="home-content">
          <Dashboard/>
        </div>
      </div>
    );
  }
});

module.exports = Home;
