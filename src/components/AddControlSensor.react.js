var React = require('react'),
    ControlLoader = require('../lib/ControlLoader'),
    DashboardStore = require('../stores/DashboardStore'),
    dashboardActions = require('../actions/dashboardActions'),
    _=require('lodash');

var Modal = require('react-bootstrap/lib/Modal');

var AddControlSensor = React.createClass({

  getDefaultProps: function(){
    return {};
  },
  getInitialState: function(){

    return {
        showModal: false
    };
  },
  componentDidMount: function(){
      DashboardStore.listen(this.onChange);
  },

  onChange: function(){
      this.setState(
        {
          showModal: DashboardStore.getState().addControlVisible
        });
  },
  getControls: function(){

    if(!this.state.showModal)
      return(<li></li>);

    if (ControlLoader.allControls().length > 0){
      let i=1;
        return(_.map(ControlLoader.allControls(),function(control){
            return(<li key={i++}>{control.control.name} ({control.control.type})</li>);
          })
      );
    }

    return(<li>No Controls Found</li>)

  },
  close: function(){
      dashboardActions.hideAddControl();
  },

  render: function() {
    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
              {this.getControls()}
            </ul>
        </Modal.Body>
        <Modal.Footer>
          <a onClick={this.close}>Close</a>
        </Modal.Footer>
      </Modal>
    );
  }
});
module.exports=AddControlSensor;
