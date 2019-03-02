import React, { Component } from "react";

import Register from "./Register";

import { Row, Col } from "reactstrap";

// Redux
import { connect } from "react-redux";

class Setting extends Component {

    render() {
        return (
            <Row>
                <Col xs={12}><h2>Setting</h2></Col>
                <Register data="object" />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Setting);