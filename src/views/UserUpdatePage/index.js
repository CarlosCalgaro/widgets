import React from 'react'

import {
    Row,
    Col
} from 'reactstrap';
import Api from 'src/api'
import {withRouter} from 'react-router-dom'
import * as userActions from 'src/store/actions/users';
import {connect} from 'react-redux';
import {toast} from 'react-toastify'
import UserUpdateForm from 'src/components/Forms/UserUpdateForm';

class UserUpdatePage extends React.Component {

    constructor(props){
        super(props);
        this.loadMe = this.loadMe.bind(this);
    }


    async loadMe(){
        try{
            let response = await Api.Users.me()
            let body = response.body
            if(response.success){
                let {user} = body.data
                this.props.actions.setUser(user)
            }else{
                toast.error(body.message)
            }
        }catch(error){
            console.log(error);
        }
    }

    async componentDidMount(){
        await this.loadMe
    }

    render(){
        return (
            <div className="wrapper">
                <Row>
                    <Col className="text-center" xs="12">
                        <h1>Update your profile</h1>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={6}>
                        <UserUpdateForm></UserUpdateForm>
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: {
          setUser: (user) => {
              return dispatch({
                  type: userActions.SET_USER,
                  payload: user
              })
          }
      }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserUpdatePage));