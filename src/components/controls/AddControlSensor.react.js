
var React = require('react');


var AddControlSensor = React.createClass({
  render() {
    return (
      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Add Control or Sensor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>Basic Movement</li>
            <li>Button</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
});
