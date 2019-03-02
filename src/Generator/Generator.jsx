import React, { Component } from "react";
import { Form } from 'reactstrap';

import Emoji from "./Emoji";
import Verb from "./Verb";
import Adjective from "./Adjective";
import Object from "./Object";
import Adverb from "./Adverb";
import Result from "./Result";
import Template from "./Template";

// Redux
import { connect } from "react-redux";

class Generator extends Component {

    render() {
        const message = this.props.message;
        let result = ""
        if (message.emoji !== "") {
            result += `${message.emoji} : `;
        }
        if (message.verb !== "") {
            result += message.verb
        }
        if (message.adjective !== "") {
            result += ` ${message.adjective}`
        }
        if (message.object !== "") {
            result += ` ${message.object}`
        }
        if (message.adverbList.length > 0) {
            result += ` ${message.adverbList.join(" ")}`
        }

        return (
            <Form>
                <Emoji />

                <Verb />

                <Adjective />

                <Object />

                <Adverb />

                <hr/>

                <Result result={result} />

                <hr/>

                <Template/>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Generator);