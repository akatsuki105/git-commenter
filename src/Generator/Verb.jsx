import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';

import verbData from '../data/verb.json';

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class Verb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "select"
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);

    }

    handleChange(e) {
        if (e.target.name === "input") {
            this.setState({
                input : e.target.value
            });
            this.props.dispatch(addElement("verb", ""));
        } else if (e.target.name === "verb") {
            this.props.dispatch(addElement("verb", e.target.value));
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="verb" onChange={this.handleChange} value={this.props.verb} >
                        <option value=""></option>
                        {
                            Object.keys(verbData).map((verb) => {
                                return (
                                    <option value={verb} key={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                                )
                            })
                        }
                    </Input>
                    <FormText color="muted">
                        {(this.props.lang === "en") ? "What is often used is in the select box." : "よく利用されるものがセレクトボックスの中に入っています。"}
                    </FormText>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" name="verb" onChange={this.handleChange} value={this.props.verb} />
                    <FormText color="muted">
                        {(this.props.lang === "en") ? "User can enter freely." : "ユーザーが自由に入力できます。"}
                    </FormText>
                </FormGroup>
            )
        }
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"🚵🏼‍ Verb"}</Label></Col>
                <Col md={2}>
                    <FormGroup>
                        <Input type="select" name="input" onChange={this.handleChange} value={this.state.input} >
                            <option value="select">{(this.props.lang === "en") ? "template" : "テンプレ"}</option>
                            <option value="form">{(this.props.lang === "en") ? "form" : "フォーム"}</option>
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={10}>
                    {this.renderInput()}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        verb: state.message.verb,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Verb);