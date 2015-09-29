var React = require('react/addons'),
    Connection = require('./Connect.react');


var Footer = React.createClass({

  render: function () {
    return (    
      <div className="footerbar">
          <Connection />
      </div>

    );
  }
});

module.exports = Footer;
