import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";

class Modifier extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "form"
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "input") {
            this.setState({
                input: e.target.value
            });
            this.props.dispatch(addElement("modifier", ""));
        } else if (e.target.name === "modifier") {
            this.props.dispatch(addElement("modifier", e.target.value));
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" bsSize="sm" name="modifier" onChange={this.handleChange} value={this.props.modifier} >
                        <option value=""></option>
                        {
                            fetchTemplate("modifier").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" bsSize="sm" name="modifier" onChange={this.handleChange} value={this.props.modifier} placeholder={(this.props.lang === "en") ? "It is a place to add something you want to add other than Verb or Adjective or Object. For example, time, condition, purpose etc..." : "コミット内容やコミット対象以外で、他に付け加えたいものを付け加える場所です。例としては、場所や時間、目的などです。"} autoComplete="off" />
                </FormGroup>
            )
        }
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"💎 Modifier"}</Label></Col>
                <Col md={2}>
                    <FormGroup>
                        <Input type="select" bsSize="sm" name="input" onChange={this.handleChange} value={this.state.input} >
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
        modifier: state.message.modifier,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Modifier);