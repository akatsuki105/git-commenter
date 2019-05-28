import React, { Component } from "react";
import { Form } from 'reactstrap';
import { connect } from "react-redux";
import Emoji from "./Emoji";
import Verb from "./Verb";
import Object from "./Object";
import Modifier from "./Modifier";
import Result from "./Result";
import Reason from "./Reason";
import Template from "./Template";
import { Link } from "react-router-dom";
import setting from "../img/setting.png";

class Generator extends Component {

    render() {
        return (
            <Form>
                <Emoji />

                <Verb />

                <Object />

                <Modifier />

                <Reason />

                <Result />

                <Template/>

                <Link to="/setting"><img id="setting-icon" src={setting} alt="setting" /></Link>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Generator);