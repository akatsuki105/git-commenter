import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import objectData from '../data/noun.json';

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class CommitObject extends Component {

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
            this.props.dispatch(addElement("object", ""));
        } else if (e.target.name === "object") {
            this.props.dispatch(addElement("object", e.target.value));
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="object" onChange={this.handleChange} value={this.props.object} >
                        <option value=""></option>
                        {
                            Object.keys(objectData).map((object) => {
                                return (
                                    <option value={object} key={object}>{(this.props.lang === "en") ? object : `${object} ${objectData[object].ja}`}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" name="object" onChange={this.handleChange} value={this.props.object} />
                </FormGroup>
            )
        }
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"⚽️ Object"}</Label></Col>
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
        object: state.message.object,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(CommitObject);