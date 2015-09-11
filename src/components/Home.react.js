var React = require('react/addons'),
    Router = require('react-router'),
    BotNav = require('./Nav.react');

var Home = React.createClass({
  mixins: [Router.Navigation],
  handleGoBackClick: function () {
    this.goBack();
  },
  render: function () {
    return (
      <div className="home">
        <div className="home-content">
          <div className="title">Dashboard</div>
          <BotNav />
        </div>
      </div>
    );
  }
});

module.exports = Home;
