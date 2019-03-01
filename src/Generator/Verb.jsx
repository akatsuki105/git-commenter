import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';

import verbData from '../data/verb.json';

class Verb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            verbForm: "",
            verbTemplate: "",
            verb: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "verbForm") {
            this.setState({
                verbForm: e.target.value,
                verbTemplate: "",
                verb: e.target.value
            });
        } else if (e.target.name === "verbTemplate") {
            this.setState({
                verbForm: "",
                verbTemplate: e.target.value,
                verb: e.target.value
            });
        }

        this.props.onUpdate("verb", e.target.value);
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>Verb</Label></Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="select" name="verbTemplate" onChange={this.handleChange} value={this.state.verbTemplate} >
                            <option value="">{(this.props.lang === "en") ? "commit category" : "どのようなコミットか"}</option>
                            {
                                Object.keys(verbData).map((verb) => {
                                    return (
                                        <option value={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                                    )
                                })
                            }
                        </Input>
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "What is often used is in the select box." : "よく利用されるものがセレクトボックスの中に入っています。"}
                        </FormText>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="text" name="verbForm" onChange={this.handleChange} value={this.state.verbForm} placeholder="Form" />
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "User can enter freely." : "ユーザーが自由に入力できます。"}
                        </FormText>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default Verb;