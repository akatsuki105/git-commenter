import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import adjectiveData from '../data/adjective.json';

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class Adjective extends Component {

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
                input: e.target.value
            });
            this.props.dispatch(addElement("adjective", ""));
        } else if (e.target.name === "adjective") {
            this.props.dispatch(addElement("adjective", e.target.value));
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="adjective" onChange={this.handleChange} value={this.props.adjective} >
                        <option value=""></option>
                        {
                            Object.keys(adjectiveData).map((adjective) => {
                                return (
                                    <option value={adjective} key={adjective}>{(this.props.lang === "en") ? adjective : `${adjective} ${adjectiveData[adjective].ja}`}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" name="adjective" onChange={this.handleChange} value={this.props.adjective} />
                </FormGroup>
            )
        }
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"✨ Adjective"}</Label></Col>
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
        adjective: state.message.adjective,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Adjective);