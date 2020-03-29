import React from 'react'

import {
    Row,
    Col,
} from 'reactstrap';
import WidgetsPagination from 'src/views/LandingPage/sections/WidgetsPagination'

class LandingPage extends React.Component {

    render(){
        return (
            <Row className="full-width mt-12 row-grid justify-content-between align-items-center text-center">
                <Col lg="12" md="12">
                    <h1 className="text-white">
                        Widgets from all around the world! <br />
                    </h1>
                    <p className="text-white mb-3">
                        Take a look of what everybody is doing!
                    </p>
                    <WidgetsPagination/>
                </Col>
            </Row>
        )
    }
}
export default LandingPage