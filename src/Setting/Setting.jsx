import React, { Component } from "react";

import { Row, Col } from "reactstrap";

class Setting extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <Row>
                <Col xs="12" className="py-3 my-2">
                    
                </Col>
            </Row>
        );
    }
}

export default Setting;