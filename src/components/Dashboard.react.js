'use strict';
var React = require('react/addons');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var _ = require('lodash');
var ReactGridLayout = require('react-grid-layout');
var Control = require('./Control.react');
var DashboardStore = require("./../stores/DashboardStore");
var dashboardActions =require("./../actions/dashboardActions");
var deviceActions =require("./../actions/deviceActions");


var Dashboard = React.createClass({

  componentWillUnmount() {

    DashboardStore.unlisten(this.onDashboardChanged);
    dashboardActions.unloading();

  },
  componentDidMount: function(){
    DashboardStore.listen(this.onDashboardChanged);
  },
  getDefaultProps: function() {
    return {
      cols: 10,
      rowHeight: 50,
    };
  },
  getInitialState: function() {
    return {
      loaded: DashboardStore.getState().loaded,
      editing: false,
      configurationSelected: DashboardStore.getState().configurationSelected,
      controls:  DashboardStore.getState().dashboardControlsList,
      controlData:[],
    };
  },

  onDashboardChanged: function(){
    var controls = DashboardStore.getState().dashboardControlsList;
    this.setState({controls: controls});
  },

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange: function(breakpoint, cols) {

  },
  onLayoutChange: function(layout) {
  //  this.setState({layout: layout});
    dashboardActions.saveDashboard(layout);
    //return true;
  },

  onRemoveItem: function(i) {
    console.log('removing group and child controls...', i);
    this.setState({items: _.reject(this.state.items, {i: i})});
    //Emit Event/Action for this group/item and it's controls...
  },

  showAddControl: function(){
      dashboardActions.showAddControl();
  },

  renderControls: function(){
    var _this = this;

  return _.map(this.state.controls,function (control) {
      let controldata = {};

        if(_this.state.controlData.length > 0)
        {
            let result = _this.state_controlData[control.Id];
              if(!_.isUndefined(result)){
                  controlData = result;
              }
        }

        return (
          <div key={control.Id} _grid={control.layout}>
            <Control control={control} data={controldata}></Control>
          </div>
          );
        }
      );
  },

  render: function() {

    if (!this.state.loaded){
        return (<div className="Loading">Loading...</div>);
      }

      if(_.keys(this.state.controls).length == 0){
        return(
          <div className="home">
            <div className="home-content">
              <div className="no-controls">
                <p>No Controls have been added yet, Add some now <a href="#" onClick={this.showAddControl}>[+]</a></p>
              </div>
          </div>
        </div>
        );
      }


    return (
      <div className="home">
        <div className="home-content">
        <ReactGridLayout className="layout" cols={12} rows={30} rowHeight={30} isResizable={true} verticalCompact={false} onLayoutChange={this.onLayoutChange}>
            {this.renderControls()}
        </ReactGridLayout>
      </div>
    </div>
    );
  }
});

module.exports = Dashboard;
