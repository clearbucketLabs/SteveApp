'use strict';
var React = require('react/addons');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var ReactGridLayout = require('react-grid-layout');
var Control = require('./Control.react');
var DashboardStore = require("./../stores/DashboardStore");
var dashboardActions =require("./../actions/dashboardActions");

var Dashboard = React.createClass({
  mixins: [PureRenderMixin],

  componentWillMount: function(){

  },
  componentWillUnmount() {
    DashboardStore.unlisten(this.onChange);
  },
  componentDidMount: function(){
    DashboardStore.listen(this.onDashboardChanged);
  },
  componentDidUpdate: function(){

  },
  getDefaultProps: function() {
    return {
      cols: 10,
      rowHeight: 50,
    };
  },
  getInitialState: function() {
    return {
      loaded: true,
      editing: false,
      controls:  DashboardStore.getState().dashboardControlsList,
      controlData:[],

    };
  },

  onDashboardChanged: function(){
    var lastState = this.state;
    lastState.controls = DashboardStore.getState().dashboardControlsList;
    this.setState(lastState);
  },

  onControlData: function(){

  },

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange: function(breakpoint, cols) {

  },

  onLayoutChange: function(layout) {
    //this.props.onLayoutChange(layout);
    this.setState({layout: layout});
  },

  onRemoveItem: function(i) {
    console.log('removing group and child controls...', i);
    this.setState({items: _.reject(this.state.items, {i: i})});
    //Emit Event/Action for this group/item and it's controls...
  },

  showAddControl: function(){

  },

  renderControls: function(){

  return _.map(this.state.controls,function (control) {
    let controldata = {};

        if(this.state.controlData.length > 0)
        {
            let result = _.result(_.find(control, control.Id), 'controlId');
              if(!_.isUndefined(result)){
                controlData = result;
              }
        }

        return (
          <div key={control.controlId}>
            <Control control={control} data={controlData}></Control>
          </div>
          );
        }
      );
  },

  render: function() {

    if (!this.state.loaded){
        return (<div className="Loading">Loading...</div>);
      }

      if(this.state.controls.length == 0){
        return(
          <div className="home">
            <div className="home-content">
              <div className="no-controls">
                <p>No Controls have been added yet, Add some now <a href="#" onClick={this.showAddControl()}>[+]</a></p>
              </div>
          </div>
        </div>
        );
      }


    return (
      <div className="home">
        <div className="home-content">
        <ReactGridLayout className="layout" cols={12} rows={30} rowHeight={30} isResizable={true} verticalCompact={false}>
            {this.renderControls()}
        </ReactGridLayout>
      </div>
    </div>
    );
  }
});

module.exports = Dashboard;
