import React, { Component } from "react";
import { Form } from 'reactstrap';

import Emoji from "./Emoji";
import Verb from "./Verb";
import Adjective from "./Adjective";
import Object from "./Object";
import Adverb from "./Adverb";
import Result from "./Result";

// Redux
import { connect } from "react-redux";

class Generator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emoji: "",
            verb: "",
            adjective: "",
            object: "",
            adverb: ""
        };

        this.update = this.update.bind(this);
    }

    update(key, value) {
        this.setState({
            [key]: value
        });
    }


    render() {
        const lang = this.props.lang;
        let result = ""
        if (this.state.emoji !== "") {
            result = `${this.state.emoji} : ${this.state.verb} ${this.state.adjective} ${this.state.object} ${this.state.adverb}`;
        } else {
            result = `${this.state.verb} ${this.state.adjective} ${this.state.object} ${this.state.adverb}`;
        }
        return (
            <Form>
                <Emoji onUpdate={this.update} lang={lang} />

                <Verb onUpdate={this.update} lang={lang} />

                <Adjective onUpdate={this.update} lang={lang} />

                <Object onUpdate={this.update} lang={lang} />

                <Adverb onUpdate={this.update} lang={lang} />

                <Result result={result} lang={lang} />
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