import React from 'react';

import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Label,
  FormGroup,
  Input,
  FormText,
  NavItem,
  NavLink,
  Nav,
  Table,
  TabContent,
  TabPane,
  Row,
  CardImg,
  Col
} from "reactstrap";



class Widget extends React.Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <Card className="card-coin card-plain">
                    <CardHeader className={"flex-row flex-wrap mb-0 border-0 d-flex flex-row"} style={{ width: '100%', marginTop: 0}}>
                    <img
                        alt="..."
                        style={{maxHeight: '50px', width: 'auto'}}
                        className="rounded-circle mr-3"
                        src={this.props.image}
                      />
                    <div>
                        {/* <!-- Title --> */}
                        <h4 className="card-title font-weight-bold mb-2">{this.props.username}</h4>
                        {/* <!-- Subtitle --> */}
                        <p className="card-text">{this.props.title}</p>
                    </div>
                    </CardHeader>
                    <CardBody className="text-left">
                        <Row>
                            <Col xs={12}>
                                <span>{this.props.children}</span>
                            </Col>
                        </Row>
                    </CardBody>
                  </Card>
            </div>
        )
    }
}

export default Widget


{/* <div class="card-body d-flex flex-row">

<!-- Avatar -->
<img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" class="rounded-circle mr-3" height="50px" width="50px" alt="avatar">

<!-- Content -->
<div>

  <!-- Title -->
  <h4 class="card-title font-weight-bold mb-2">New spicy meals</h4>
  <!-- Subtitle -->
  <p class="card-text"><i class="far fa-clock pr-2"></i>07/24/2018</p>

</div>

</div> */}


{/* <div class="container">
    
    <br>
    <div class="card">
        <div class="row no-gutters">
            <div class="col-auto">
                <img src="//placehold.it/200" class="img-fluid" alt="">
            </div>
            <div class="col">
                <div class="card-block px-2">
                    <h4 class="card-title">Title</h4>
                    <p class="card-text">Description</p>
                    <a href="#" class="btn btn-primary">BUTTON</a>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
            Footer stating cats are CUTE little animals
        </div>
    </div>
</div> */}