'use strict'
/*
 * Base Control - Instantiates dashboard item, provides context menu and
 * settings configuration for the control if any.
 * Also works with the mapper for data transforms, filtering etc...
 */
 var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin'),
     _ = require('lodash'),
     React = require('react'),
     classNames = require('classNames'),
     ControlLoader = require('../lib/ControlLoader');



     var ControlGroup = React.createClass({
       mixins: [PureRenderMixin],

       getDefaultProps: function() {
         return {
           control: {},
           controlData: {}
         };
       },
       getInitialState: function() {
         return {
                  controlData: {}
                };
       },

       loadControl: function() {
          return React.createElement(this.props.control.control.control);
      },

      onRemoveItem: function(i) {
        this.props.removeItem(i)
      },

      render: function() {
         return (
           <div>
                {this.loadControl()}
            </div>
         );
       }
     });

module.exports = ControlGroup;
