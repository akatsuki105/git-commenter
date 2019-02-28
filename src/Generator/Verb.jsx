import React, { Component } from "react";
import { FormGroup, Label, Input } from 'reactstrap';

import verbData from '../data/verb.json';

class Verb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            verb: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.props.onUpdate("verb", e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <Label for="verb">Verb</Label>
                <Input type="select" name="verb" onChange={this.handleChange}>
                    <option value="">{(this.props.lang === "en") ? "commit category" : "どのようなコミットか"}</option>
                    {
                        Object.keys(verbData).map((verb) => {
                            return (
                                <option value={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                            )
                        })
                    }
                </Input>
            </FormGroup>
        );
    }
}

export default Verb;