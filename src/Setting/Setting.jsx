import React, { Component } from "react";

import Register from "./Register";
import MessageRegister from "./MessageRegister";

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
                <Register data="modifier" emoji="💎" />
                <Register data="reason" emoji="❓" />
                <MessageRegister />
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps)(Setting);