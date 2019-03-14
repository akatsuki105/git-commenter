import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import Aws from "../util/aws";

class CommitObject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "form",
            objectTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.renderInput = this.renderInput.bind(this);

    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("object", 20);

        this.setState({
            objectTmpls: tmpls
        })
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
        const objectData = this.state.objectTmpls;
        if (this.state.input === "select") {
            return (
                <FormGroup>
                    <Input type="select" name="object" onChange={this.handleChange} value={this.props.object} >
                        <option value=""></option>
                        {
                            fetchTemplate("object").map((element) => {
                                return (
                                    <option value={element} key={element}>{element}</option>
                                )
                            })
                        }
                        {
                            Object.keys(objectData).map((object) => {
                                return (
                                    <option value={object} key={object}>{(this.props.lang === "en") ? object : `${object} ${objectData[object].ja}`}</option>
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
                    <Input type="text" name="object" onChange={this.handleChange} value={this.props.object} />
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