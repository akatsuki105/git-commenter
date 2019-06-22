import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement, addPhrase } from "../Redux/actions";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import Aws from "../util/aws";

class Verb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "select",
            verbTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);
        this.setPhraseToRedux = this.setPhraseToRedux.bind(this);
    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("verb", 50);

        this.setState({
            verbTmpls: tmpls
        })
    }

    handleChange(e) {
        if (e.target.name === "input") {
            this.setState({
                input: e.target.value
            });
            this.props.dispatch(addElement("verb", ""));
        } else if (e.target.name === "verb") {
            this.props.dispatch(addElement("verb", e.target.value));
            if (this.state.input === "select") {
                this.setPhraseToRedux(e.target.value);
            }
        }
    }

    async setPhraseToRedux(word) {
        const phraseList = (await Aws.fetchWord("verb", word)).phrase || {} ;
        console.log("phraseList: ", phraseList);
        this.props.dispatch(addPhrase(phraseList));
    }

    renderInput() {
        const verbData = this.state.verbTmpls;
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" bsSize="sm" name="verb" onChange={this.handleChange} value={this.props.verb} >
                        <option value=""></option>
                        {
                            fetchTemplate("verb").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(verbData).map((verb) => {
                                return (
                                    <option value={verb} key={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <FormGroup>
                    <Input type="text" bsSize="sm" name="verb" list="verb-tmpl" onChange={this.handleChange} placeholder={(this.props.lang === "en") ? "User can enter freely." : "コミット内容を入力するところです。 例 : 何かを追加した=> 「Add」"} value={this.props.verb} autoComplete="off" />
                    <datalist id="verb-tmpl">
                        {
                            fetchTemplate("verb").map((element) => {
                                return (
                                    <option value={element} key={element} >{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(verbData).map((verb) => {
                                return (
                                    <option value={verb} key={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                                )
                            })
                        }
                    </datalist>
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
        verb: state.message.verb,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Verb);