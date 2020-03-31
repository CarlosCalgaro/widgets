import React from 'react'

import {
    Row,
    Col,
} from 'reactstrap';
import {Link} from 'react-router-dom';

import WidgetsPagination from 'src/views/WidgetsPage/sections/WidgetsPagination'

class WidgetsPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFocused: false
        }
    }

    render(){
        return (
            <div>
                <Row className="full-width mt-12 row-grid justify-content-between align-items-center text-center">
                    <Col lg="12" md="12">
                        <h1 className="text-white">
                            Your Widgets!<br />
                        </h1>
                        <p className="text-white mb-3">
                            View and manage your personal widgets!
                        </p>
                    </Col>
                </Row>
                <Row className="full-width mt-12 row-grid justify-content-between align-items-center text-center">
                    <Col xs={12}>
                         <div className="btn-wrapper mb-5">
                            <div className="button-container">
                                <Link className="btn btn-warning" to="/widgets/create">
                                    Create Widget
                                </Link>
                            </div>
                        </div>
                        <Row className="mb-3 full-width mt-12 row-grid justify-content-between align-items-center text-center">
                            <Col xs={12}>
                                Or
                            </Col>
                        </Row>
                        <div className="button-wrapper">
                            <WidgetsPagination/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default WidgetsPage

