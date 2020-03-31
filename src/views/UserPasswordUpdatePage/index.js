import React from 'react'

import {
    Row,
    Col
} from 'reactstrap';
import ChangePasswordForm from 'src/components/Forms/ChangePasswordForm'

class UserPasswordUpdatePage extends React.Component {

    render(){
        return (
            <div className="wrapper">
                <Row>
                    <Col className="text-center" xs="12">
                        <h1>Update your password</h1>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={3}>
                        <ChangePasswordForm />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default UserPasswordUpdatePage;