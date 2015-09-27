'use strict'


var React = require('react'),
    ControlLoader = require('../lib/ControlLoader');

var AddControlSensor = React.createClass({

  getControls(){

    if (ControlLoader.allControls.length > 0){
        return(_.each(ControlLoader.allControls,function(control){
            return(<li>{control.name} ({control.type})</li>);
          })
      );
    }

    return(<li>No Controls Found</li>)

  },

  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Add Control or Sensor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
              {this.getControls()}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
