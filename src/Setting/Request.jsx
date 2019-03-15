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
                <Col md={10}>
                    <FormGroup>
                        <Label for="word">Word</Label>
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
                    <Col md={5}>
                        <FormGroup>
                            <Label for="word">Word</Label>
                            <Input type="text" name="word" bsSize="sm" autoComplete="off" onChange={this.handleChange} value={this.state.word} placeholder="enter a word" />
                            <FormText>
                                デフォルトテンプレートとして採用してもらいたい語句を入力してください
                            </FormText>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Label for="ja">日本語訳</Label>
                            <Input type="text" name="ja" bsSize="sm" autoComplete="off" onChange={this.handleChange} value={this.state.ja} />
                            <FormText>
                                日本語訳なるべく簡潔に入力してください 例. wordでaddを入力 => 追加
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
                <Col xs={12}><h5>{"🛎"} Request</h5></Col>
                <Col xs={12} className="mt-1 mb-4">
                    <Form>
                        <Row form>
                            <Col md={2}>
                                <FormGroup>
                                    <Label for="category">Category</Label>
                                    <Input type="select" name="category" bsSize="sm" onChange={this.handleChange} value={this.state.category} >
                                        <option value=""></option>
                                        <option value="verb">Verb</option>
                                        <option value="adjective">Adjective</option>
                                        <option value="object">Object</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            {this.renderInput()}
                        </Row>
                        <Button size="sm" onClick={this.sendRequest}>Send a request</Button>
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