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
        showModal: false,
        screen: 'select',
        controlSelected: {}
    };
  },
  componentDidMount: function(){
      DashboardStore.listen(this.onChange);
  },

  onChange: function(){
    var visible = DashboardStore.getState().addControlVisible

      this.setState(
        {
          screen:'select',
          showModal: visible,
          controlSelected:{}
        });
  },

  selectedControl: function(control,event){
      this.setState({
        showModal:true,
        screen: 'configure',
        controlSelected: control
      })
  },

  getControls: function(){
    var that=this;
    if(!this.state.showModal)
      return(<li></li>);

    if (ControlLoader.allControls().length > 0){
      let i=1;
        return(_.map(ControlLoader.allControls(),function(control){
            return(<li key={i++}><a onClick={that.selectedControl.bind(that,control)}>{control.name} ({control.type})</a></li>);
          })
      );
    }

    return(<li>No Controls Found</li>)

  },
  onConfigure: function(){
      var s = this.state;
      s.screen = 'configure';
      this.setState(s);
  },

  addControl: function(){
      dashboardActions.addControl(this.state.controlSelected.guid);
      //this.close();
  },

  close: function(){
      dashboardActions.hideAddControl();
  },

  render: function() {


    var currentView;
    var addControl=(<span></span>);

    if(this.state.screen == 'select'){
    currentView = (
                    <ul>
                        {this.getControls()}
                    </ul>
                  );
    }

    if(this.state.screen=='configure'){
      currentView = (
              <div>
                configure
              </div>
        );
      addControl=(<a onClick={this.addControl}>Add Control</a>);
    }

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-sm">Add Control</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {currentView}
        </Modal.Body>
        <Modal.Footer>
          <a onClick={this.close}>Close</a> {addControl}
        </Modal.Footer>
      </Modal>
    );
  }
});
module.exports=AddControlSensor;
