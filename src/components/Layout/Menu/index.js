import React from 'react';
import { Link } from "react-router-dom";
import ProfileButton from 'src/components/Layout/Menu/sections/ProfileButton';
import ModalForm from 'src/components/ModalForm';
import SignInForm from 'src/components/Forms/SignInForm';
import ForgotPassordForm from 'src/components/Forms/ForgotPasswordForm';
import RegisterForm from 'src/components/Forms/RegisterForm'
import {connect} from "react-redux";
import * as actions from 'src/store/actions/modals';
import {withRouter} from 'react-router-dom';
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Navbar,
  Container,
  NavbarBrand,
  Collapse
} from "reactstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.handleForgotPasswordAction = this.handleForgotPasswordAction.bind(this);
    this.getMenu = this.getMenu.bind(this);
    this.changeColor = this.changeColor.bind(this);
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.onCollapseExiting = this.onCollapseExiting.bind(this);
    this.afterRegister = this.afterRegister.bind(this);
    this.onCollapseExited = this.onCollapseExited.bind(this);
  }
  
  afterRegister(){
    this.props.actions.toggle("register_modal");
    this.props.history.push("/me");
  }

  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  
  handleForgotPasswordAction(){
    this.props.actions.toggle("sign_in_modal")
    this.props.actions.toggle("forgot_password_modal")
  }

  userLoggedIn(){
    return (this.props.authentication.access_token === "") ? false : true
  }

  getMenu(){
    if(this.userLoggedIn()){
      return(
      <Nav className="ml-auto" navbar>
         <NavItem>
          <NavLink href="/">
            <i className="tim-icons icon-bank" />
            Users Widgets
          </NavLink>
        </NavItem>
         <NavItem>
          <NavLink href="/widgets">
            <i className="tim-icons icon-atom" />
            My Widgets
          </NavLink>
        </NavItem>
        <NavItem>
          <ProfileButton></ProfileButton>
        </NavItem>
      </Nav>
      )
    }else{
      return(
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="#" onClick={(e) => this.props.actions.toggle("register_modal")}>
            Register
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#"  onClick={(e) => this.props.actions.toggle("sign_in_modal")}>
            Sign in
          </NavLink>
        </NavItem>
      </Nav>
      )
    }
 
  }

  changeColor(){
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  
  toggleCollapse(){
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };

  onCollapseExiting(){
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  
  onCollapseExited(){
    this.setState({
      collapseOut: ""
    });
  };

  render() {
    return (

      <div className="wrapper">
        <div id="navbar">
          <div className="navigation-example">
            {/* Navbar Primary */}
            <Navbar
              className={"fixed-top " + this.state.color}
              color-on-scroll="100"
              expand="lg">
              <Container>
                <div className="navbar-translate">
                  <NavbarBrand
                    data-placement="bottom"
                    to="/"
                    rel="noopener noreferrer"
                    title="Widgets"
                    tag={Link}
                    className={"mr-auto"}
                  >
                    <span>Widgets </span>
                  </NavbarBrand>
                </div>
                <Collapse navbar isOpen={false}>
                  {this.getMenu()}
                </Collapse>
              </Container>
            </Navbar>

          </div>
        </div>
        <ModalForm description={"Sign in with"} name={"sign_in_modal"}>
          <SignInForm afterLogin={() => {this.props.actions.toggle("sign_in_modal")}} handleForgotPasswordAction={this.handleForgotPasswordAction}></SignInForm>
        </ModalForm>


        <ModalForm description={"Register with"} name={"register_modal"}>
          <RegisterForm afterRegister={this.afterRegister}></RegisterForm>
        </ModalForm>


        <ModalForm description={"Recover password"} name={"forgot_password_modal"}>
          <ForgotPassordForm afterLogin={() => {this.props.actions.toggle("forgot_password_modal")}}></ForgotPassordForm>
        </ModalForm>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))