var React = require('react'),
    Header = require('./Header.react'),
    SideBar = require('./SideBar.react'),
    Footer = require('./Footer.react'),
    ReactGridLayout = require('react-grid-layout'),
    AddControlSensor = require('./AddControlSensor.react');

var Main = React.createClass({

  componentWillDismount: function(){
  },

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="main-container-body">
          <div className="main-content-area">
            <Router.RouteHandler />
          </div>
        </div>
        <AddControlSensor />
        <Footer />
      </div>
    );
  }
});

module.exports = Main;
