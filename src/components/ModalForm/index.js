import React from 'react';
import {
    Modal
  } from "reactstrap";
import {connect} from "react-redux";
import * as actions from 'src/store/actions/modals';
  

class ModalForm extends  React.Component {

    constructor(props){
      super(props);
      this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal(){
      this.props.actions.toggle(this.props.name)
    };

    render(){
      return(
          <Modal
            modalClassName="modal-black"
            isOpen={this.props.modals[this.props.name]}
            toggle={this.toggleModal}
          >
            <div className="modal-header justify-content-center">
              <button
                className="close"
                onClick={this.toggleModal}
              >
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">{this.props.description}</h3>
              </div>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </Modal>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    modals: state.modals
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: {
          toggle: (modal) => {
              return dispatch({
                  type: actions.TOGGLE,
                  payload: modal
              })
          }
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForm);