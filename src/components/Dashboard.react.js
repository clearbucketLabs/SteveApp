'use strict';
var React = require('react');
//var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var ResponsiveReactGridLayout = require('react-grid-layout').Responsive;
var ControlGroup = require('./controls/ControlGroup.react');

var Dashboard = React.createClass({
  //mixins: [PureRenderMixin],

  getDefaultProps() {
    return {
      className: "layout",
      cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
      rowHeight: 100
    };
  },

  getInitialState() {
    return {
      controlGroups: [],
      loaded: false,
      editing: false,
      newCounter: 0
    };
  },
  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  },

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  },

  onRemoveItem(i) {
    console.log('removing group and child controls...', i);
    this.setState({items: _.reject(this.state.items, {i: i})});
    //Emit Event/Action for this group/item and it's controls...
  },

  render() {
    return (
      <div>
        <ResponsiveReactGridLayout onLayoutChange={this.onLayoutChange} onBreakpointChange={this.onBreakpointChange}>
          <ControlGroup editing={this.state.editing}/>
        </ResponsiveReactGridLayout>
      </div>
    );
  }
});

module.exports = Dashboard;
