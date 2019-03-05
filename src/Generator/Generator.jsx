import React, { Component } from "react";
import { Form } from 'reactstrap';

import Emoji from "./Emoji";
import Verb from "./Verb";
import Adjective from "./Adjective";
import Object from "./Object";
import Modifier from "./Modifier";
import Result from "./Result";
import Reason from "./Reason";
import Template from "./Template";

// Redux
import { connect } from "react-redux";

class Generator extends Component {

    render() {
        return (
            <Form>
                <Emoji />

                <Verb />

                <Adjective />

                <Object />

                <Modifier />

                <Reason />

                <hr/>

                <Result />

                <hr/>

                <Template/>
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