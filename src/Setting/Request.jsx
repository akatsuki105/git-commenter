// TemplateのRequestをするフォーム
import React, { Component } from "react";
import { Button, Col, Row, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import { connect } from "react-redux";
import Aws from "../util/aws";

class Request extends Component {

    constructor(props) {
        super(props);

        this.state = {
            category: "",
            word: "",
            ja: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.sendRequest = this.sendRequest.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async sendRequest() {
        await Aws.requestTmpl(this.state.category, this.state.word, this.state.ja);

        this.setState({
            category: "",
            word: "",
            ja: ""
        });

        window.alert("リクエストを送信しました");
    }

    renderInput() {
        if (this.props.lang === "en") {
            return (
                <Col md={8}>
                    <FormGroup>
                        <Input type="text" name="word" bsSize="sm" autoComplete="off" onChange={this.handleChange} value={this.state.word} placeholder="enter a word" />
                        <FormText>
                            Please enter the words you want to be included in the default template for this service.
                        </FormText>
                    </FormGroup>
                </Col>
            )
        } else {
            return (
                <React.Fragment>
                    <Col md={4}>
                        <FormGroup>
                            <Input type="text" name="word" bsSize="sm" autoComplete="off" onChange={this.handleChange} value={this.state.word} placeholder="enter a word" />
                            <FormText>
                                デフォルトテンプレートとして採用してもらいたい語句を入力してください
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col md={4}>
                        <FormGroup>
                            <Input type="text" name="ja" bsSize="sm" autoComplete="off" onChange={this.handleChange} value={this.state.ja} />
                            <FormText>
                                語句の日本語訳をなるべく簡潔に入力してください
                            </FormText>
                        </FormGroup>
                    </Col>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <React.Fragment>
                <Col xs={12}>{"🛎"} Request</Col>
                <Col xs={12} className="my-1">
                    <Form>
                        <Row form>
                            <Col md={2}>
                                <FormGroup>
                                    <Input type="select" name="category" bsSize="sm" onChange={this.handleChange} value={this.state.category} >
                                        <option value="">Category</option>
                                        <option value="verb">Verb</option>
                                        <option value="adjective">Adjective</option>
                                        <option value="object">Object</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            {this.renderInput()}
                            <Col md={2}>
                                <Button size="sm" onClick={this.sendRequest} block>Send a request</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Request);