import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class Reason extends Component {

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
            this.props.dispatch(addElement("reason", ""));
        } else if (e.target.name === "reason") {
            this.props.dispatch(addElement("reason", e.target.value));
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="reason" onChange={this.handleChange} value={this.props.reason} >
                        <option value=""></option>
                        {
                            fetchTemplate("reason").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                    </Input>
                    <FormText color="muted">
                        {(this.props.lang === "en") ? "What is often used is in the select box." : "コミットメッセージの中でよく利用されるものがテンプレの中に入っています。"}
                    </FormText>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="textarea" name="reason" onChange={this.handleChange} value={this.props.reason} style={{ resize: "horizontal", height: "60px" }}></Input>
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
                <Col md={12}><Label>{"❓ Reason"}</Label></Col>
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
        reason: state.message.reason,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Reason);