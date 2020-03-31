import React from 'react'

import {
    Row,
    Col
} from 'reactstrap';

import WidgetForm from 'src/components/Forms/WidgetForm'
class WidgetsFormPage extends React.Component {

    render(){
        return (
            <Row className="full-width mt-12 row-grid justify-content-between align-items-center text-center">
                <Col lg="12" md="12">
                    <h1 className="text-white">
                        Widgets Form<br/>
                    </h1>
                    <Row className="d-flex justify-content-center">
                        <Col xs={12} md={6}>
                            <WidgetForm />
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}
export default WidgetsFormPage