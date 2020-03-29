import React from 'react';
import {
    Modal
  } from "reactstrap";
import classnames from "classnames";
  

class ModalForm extends  React.Component {

    constructor(props){
        super(props);
        this.state = {
            formModal: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.open !== prevProps.open) {
            this.toggleModal("formModal")
        }
    }

    toggleModal = modalState => {
        this.setState({
          [modalState]: !this.state[modalState]
        });
    };

    render(){
      return(
          <Modal
            modalClassName="modal-black"
            isOpen={this.state.formModal}
            toggle={() => this.toggleModal("formModal")}
          >
            <div className="modal-header justify-content-center">
              <button
                className="close"
                onClick={() => this.toggleModal("formModal")}
              >
                <i className="tim-icons icon-simple-remove text-white" />
              </button>
              <div className="text-muted text-center ml-auto mr-auto">
                <h3 className="mb-0">Sign in with</h3>
              </div>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
          </Modal>
      )
    }
}

export default ModalForm;