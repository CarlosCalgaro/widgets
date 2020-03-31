import React from 'react';
import Menu from 'src/components/Layout/Menu';
import routes from 'src/config/routes';
import {Route, Switch} from "react-router-dom";
import Api from 'src/api'

import {
    Row,
    Col
  } from "reactstrap";
  
class Layout extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            formLogin: false
        }
        this.toggleModal = this.toggleModal.bind(this)
        this.discover = this.discover.bind(this);
    }

    discover(){
        Api.Widgets.visible()
    }

    toggleModal(modalState){
        this.setState({
          [modalState]: !this.state[modalState]
        });
    };

    render(){
        const appRoutes = routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={props => (
                  <route.component {...props} />
                )} />
            ) : (null);
          })
        return(
            <div className="app">
                
                <div className="wrapper heigth-16em">
                    <div className="page-header">
                        <img
                            alt="..."
                            className="path"
                            src={require("src/assets/img/blob.png")}
                        />
                        <Menu className="" discoverAction={this.discover} loginAction={(e) => {this.toggleModal("formLogin")}}/>
                    </div>
                </div>
                <div className="wrapper">
                    <div className="main-section content-center">
                        <Row className="main-container row-grid justify-content-between align-items-center">
                            <Col xs="12">
                                <Switch>
                                    {appRoutes}
                                </Switch>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
}
export default Layout;