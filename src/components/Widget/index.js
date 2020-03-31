import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button
} from "reactstrap";
import {Link} from 'react-router-dom'
import Api from 'src/api'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import * as widgetsActions from 'src/store/actions/widgets';
class Widget extends React.Component {

    constructor(props){
        super(props);
        this.destroy = this.destroy.bind(this);
    }

    async destroy(){
        try{
            let response = await Api.Widgets.destroy(this.props.id);
            let body = response.body;
            if(response.success){
                this.props.actions.remove(this.props.id)
            }else{
                toast.error(body.message);
            }
        }catch(error){
            console.log(error);
        }
    }

    render(){
        let editButton = ""
        if(this.props.id){
            editButton = <Col xs={6} style={{justifyContent: 'flex-end'}} className="d-flex text-right justify-content-right">
                            <div className="button-wrapper">
                                {/* <Link to={"/widgets/update/" + this.props.id} 
                                    className="btn btn-primary btn-round btn-icon">
                                    <i className="tim-icons icon-pencil" />
                                </Link> */}
                                <Button className="btn-round btn-icon my-4" 
                                        color="danger"
                                        onClick={this.destroy}>
                                        <i className="tim-icons icon-trash-simple" />
                                </Button>   
                            </div>
                        </Col>
        }
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
                        <h4 className="card-title font-weight-bold mb-2">
                            <Link to={"/user/" + this.props.userId}>
                                {this.props.username}
                            </Link>
                            
                        </h4>
                        {/* <!-- Subtitle --> */}
                        <p className="card-text">{this.props.title}</p>
                    </div>
                    </CardHeader>
                    <CardBody className="text-left">
                        <Row className="mb-5">
                            <Col xs={12}>
                                <span>{this.props.children}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <span>Kind: {this.props.kind}</span>
                            </Col>
                            {editButton}
                        </Row>
                    </CardBody>
                  </Card>
            </div>
        )
    }
}


Widget.defaultProps = {
    id: null
};
  
Widget.propTypes = {
    name: PropTypes.number
};


const mapStateToProps = (state) => {
    return {
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            remove: (id) => {
                return dispatch({
                    type: widgetsActions.REMOVE_VISIBLE_WIDGET,
                    payload: {
                        id: id
                    }
                })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Widget)