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
            result += `${this.state.emoji} : `;
        }
        if (this.state.verb !== "") {
            result += this.state.verb
        }
        if (this.state.adjective !== "") {
            result += ` ${this.state.adjective}`
        }
        if (this.state.object !== "") {
            result += ` ${this.state.object}`
        }
        if (this.state.adverb !== "") {
            result += ` ${this.state.adverb}`
        }

        return (
            <Form>
                <Emoji onUpdate={this.update} lang={lang} />

                <Verb onUpdate={this.update} lang={lang} />

                <Adjective onUpdate={this.update} lang={lang} />

                <Object onUpdate={this.update} lang={lang} />

                <Adverb onUpdate={this.update} lang={lang} />

                <hr/>

                <Result result={result} lang={lang} />

                <hr/>

                <Template lang={lang} />
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