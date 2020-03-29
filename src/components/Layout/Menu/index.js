import React from 'react';
import { Link } from "react-router-dom";
import ProfileButton from 'src/components/Layout/Menu/sections/ProfileButton';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  NavbarToggler,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle
} from "reactstrap";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent"
    };
  }
  
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  
  changeColor = () => {
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

  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };
  render() {
    return (


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
                <Nav className="ml-auto" navbar>
                  <NavItem className="active">
                    <NavLink href="#pablo" onClick={this.props.discoverAction}>
                      <i className="tim-icons icon-world" />
                      Discover
                    </NavLink>
                  </NavItem>
                 <ProfileButton>
                 </ProfileButton>
                  {/* <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                      <i className="tim-icons icon-single-02" />
                      Profile
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#pablo" onClick={e => e.preventDefault()}>
                      <i className="tim-icons icon-settings-gear-63" />
                      Settings
                    </NavLink>
                  </NavItem> */}
                </Nav>
              </Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    );
  }
}
export default Menu