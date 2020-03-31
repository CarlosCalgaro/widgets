import React from 'react'

import {
    Row,
    Col,
    Container
} from 'reactstrap';
import Api from 'src/api'
import {withRouter} from 'react-router-dom'
import * as userActions from 'src/store/actions/users';
// import {store} from 'src/store';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as moment from 'moment';
import {toast} from 'react-toastify';

class ProfilePage extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
        this.loadMe = this.loadMe.bind(this);
        this.loadProfile = this.loadProfile.bind(this);
        let {id} = this.props.match.params
        this.id = id
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

    async loadProfile(){
        try{
            let response = await Api.Users.show(this.id)
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
        let {id} = this.props.match.params
        if(id){
            this.loadProfile()
        }else{
            this.loadMe()
        }
     
    }

    render(){
        let {user} = this.props
        let {id} = this.props.match.params
        let button = ""
        if(!id){
            button = <Row>
                <Col xs={12}>
                    <Link className="btn btn-primary" to="user/update">
                        Update Profile
                    </Link>
                    <Link className="btn btn-info" to="user/update_password">
                        Change Password
                    </Link>
                </Col>
            </Row>
        }
        return (
            <div className="wrapper">
                <div className="page-header">
                    <img
                        alt="..."
                        className="dots"
                        src={require("src/assets/img/dots.png")} />
                    <img
                        alt="..."
                        className="path"
                        src={require("src/assets/img/path4.png")} />
                <Container className="align-items-center">
                <Row>
                    <Col lg="8" md="8">
                    <h1 className="profile-title text-left">{user.name}</h1>
                    <h4 className="">Email: {user.email}</h4>
                    <h4 className="">{moment(user.date_of_birth).format("DD/MM/YYYY")}</h4>
                    <h4 className="">Active: {user.active ? "Yes" : "No"}</h4>
                    <p className="profile-description">

                    </p>
                    </Col>
                    <Col>
                        <img
                            alt="..."
                            className="img-center img-fluid rounded-circle"
                            src={user.images.large_url}
                        />
                    </Col>
                </Row>
                {button}
            </Container>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));