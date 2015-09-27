'use strict'
/*
 * Base Control - Instantiates dashboard item, provides context menu and
 * settings configuration for the control if any.
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
           controlData: {},
           onRemoveItem: function(){},
         };
       },
       getInitialState: function() {
         return {
                  controlData: {}
                };
       },

       loadControl: function() {
          return React.createElement(nav.control);
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