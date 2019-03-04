import React, { Component } from "react";

import Register from "./Register";

import { Row, Col } from "reactstrap";

// Redux
import { connect } from "react-redux";

class Setting extends Component {

    render() {
        return (
            <Row>
                <Col xs={12} className="mb-3"><h2>⚒ Setting 🛠</h2></Col>
                <Register data="verb" emoji="🚵🏼‍" />
                <Register data="adjective" emoji="✨" />
                <Register data="object" emoji="⚽️" />
                <Register data="reason" emoji="❓" />
                <Register data="message" emoji="🖨" />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Setting);