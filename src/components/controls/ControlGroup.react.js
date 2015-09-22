/*
 * Group multiple controls
 *
 */
 'use strict';
 var React = require('react');
 var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
 var _ = require('lodash');
 var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;




var ControlGroup = React.createClass({
       mixins: [PureRenderMixin],

       getDefaultProps() {
         return {
           className: "layout",
           cols: {lg: 10, md: 8, sm: 6, xs: 4, xxs: 2},
           rowHeight: 10,
           editing: false
         };
       },

       getInitialState() {
         return {
           controls: [],
           loaded: false,
           editing: this.props.editing,
           newCounter: 0
         };
       },

       loadControls() {
          return _.map(_.range(4), function(i) {
            return (<div key={i}><span className="text">control-{i}</span></div>);
          });
        },

       onLayoutChange(layout) {
         //trigger save...
         //this.props.onLayoutChange(layout);
        // this.setState({layout: layout});
       },

       onRemoveItem(i) {
         console.log('removing', i);
        // this.setState({items: _.reject(this.state.items, {i: i})});
       },

       render() {
         return (
             <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} className={this.props.className} cols={this.props.cols} rowHeight={this.props.rowHeight}>
              <div className="controlGroup">
                <div className="controls">
                    {this.loadControls()}
                </div>
              </div>
             </ResponsiveReactGridLayout>
         );
       }
     });

module.exports = ControlGroup;
