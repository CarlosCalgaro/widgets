import React from 'react';
import { 
    UncontrolledDropdown, 
    DropdownItem, 
    DropdownMenu, 
    DropdownToggle } from 'reactstrap';
import classnames from 'classnames';
import {connect} from 'react-redux'
import * as authenticationActions from 'src/store/actions/authentication'
import Api from 'src/api'
import { toast } from 'react-toastify';
import {withRouter} from 'react-router-dom';

class ProfileButton extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            formLogin: true
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.loginButtonClasses = this.loginButtonClasses.bind(this);
        this.logoutButtonClasses = this.logoutButtonClasses.bind(this);
    }

    async handleLogout(){
        try{
            let response = await Api.Authentication.revoke()
            this.props.actions.revoke_credentials()
            let body = response.body
            if(response.success){
                toast.success("You have logged out successfully!")
                this.props.history.push("/");
            }else{
                toast.error(body.message)
            }
        }catch(error){

        }
    }

    logoutButtonClasses(classes){
        if(this.props.authentication.access_token === ""){
            return classnames(classes, "d-none")
        }
        return classes
    }

    loginButtonClasses(classes){
        if(this.props.authentication.access_token !== ""){
            return classnames(classes, "d-none")
        }
        return classes
    }

    toggleModal(modalState){
        this.setState({
          [modalState]: !this.state[modalState]
        });
    };

    render(){
        return(
            <UncontrolledDropdown >
                <DropdownToggle
                    aria-expanded={false}
                    aria-haspopup={true}
                    caret
                    color="default"
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    nav
                >
                    <i className="tim-icons icon-single-02" />
                    Profile
                </DropdownToggle>
                <DropdownMenu aria-labelledby="navbarDropdownMenuLink">
                    <DropdownItem href="/me">
                    Profile
                    </DropdownItem>
                    <DropdownItem onClick={this.handleLogout}>
                    Logout
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authentication: state.authentication
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            revoke_credentials: () => {
                return dispatch({
                    type: authenticationActions.REVOKE_CREDENTIALS
                })
            }
        }
    }
}
export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileButton));