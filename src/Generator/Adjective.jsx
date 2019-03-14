import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import Aws from "../util/aws";

class Adjective extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "form",
            adjectiveTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);

    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("adjective", 20);

        this.setState({
            adjectiveTmpls: tmpls
        })
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
        const adjectiveData = this.state.adjectiveTmpls;
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="adjective" onChange={this.handleChange} value={this.props.adjective} >
                        <option value=""></option>
                        {
                            fetchTemplate("adjective").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(adjectiveData).map((adjective) => {
                                return (
                                    <option value={adjective} key={adjective}>{(this.props.lang === "en") ? adjective : `${adjective} ${adjectiveData[adjective].ja}`}</option>
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
                    <Input type="text" name="adjective" onChange={this.handleChange} value={this.props.adjective} />
                    <FormText color="muted">
                        {(this.props.lang === "en") ? "This is where you enter words that qualify Object. You do not have to enter if you do not need it.  e.g. new, unused " : "コミットの対象(Object)を修飾する語句を入力するところです。必要がないならば無理に入力する必要はありません。 例:「new」,「unused」"}
                    </FormText>
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