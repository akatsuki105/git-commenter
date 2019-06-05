import React, { Component } from "react";
import { Button, Col, FormGroup, Input, FormText } from "reactstrap";
import { connect } from "react-redux";
import { fetchTemplate } from "../util/util";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addFormat: "verb",
            addTarget: "",
            removeFormat: "verb",
            removeTarget: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    add() {
        if (this.state.addTarget !== "") {
            let template = fetchTemplate(this.state.addFormat);
            template.push(this.state.addTarget);
            localStorage.setItem(this.state.addFormat, JSON.stringify(template));

            this.setState({
                addTarget: ""
            });
        }
    }

    remove() {
        const template = fetchTemplate(this.state.removeFormat);
        const newTemplate = template.filter(n => n !== this.state.removeTarget);
        localStorage.setItem(this.state.removeFormat, JSON.stringify(newTemplate));

        this.setState({
            removeTarget: ""
        });
    }

    render() {
        return (
            <React.Fragment>
                <Col xs={12}>{"🖨"} {(this.props.lang === "en") ? `Add or Remove Template` : `テンプレートの追加・削除`}</Col>
                <Col xs={12} className="my-1">

                    <FormGroup row>
                        <Col sm={2}>{(this.props.lang === "en") ? `Add Template` : `テンプレートの追加`}</Col>
                        <Col sm={2}>
                            <Input type="select" name="addFormat" bsSize="sm" onChange={this.handleChange} value={this.state.addFormat}>
                                <option value="verb">verb</option>
                                <option value="object">object</option>
                                <option value="modifier">modifier</option>
                                <option value="reason">reason</option>
                            </Input>
                        </Col>
                        <Col sm={6}>
                            <Input type="text" name="addTarget" bsSize="sm" onChange={this.handleChange} value={this.state.addTarget} />
                            <FormText>
                                {(this.props.lang === "en") ? `Please enter the template you want to register.` : `登録したいテンプレートを入力してください。`}
                            </FormText>
                        </Col>
                        <Col sm={2}>
                            <Button color="primary" size="sm" onClick={this.add} block>Add</Button>
                        </Col>
                        
                        <Col sm={2}>{(this.props.lang === "en") ? `Remove Template` : `テンプレートの削除`}</Col>
                        <Col sm={2}>
                            <Input type="select" name="removeFormat" bsSize="sm" onChange={this.handleChange} value={this.state.removeFormat}>
                                <option value="verb">verb</option>
                                <option value="object">object</option>
                                <option value="modifier">modifier</option>
                                <option value="reason">reason</option>
                            </Input>
                        </Col>
                        <Col sm={6}>
                            <Input type="select" name="removeTarget" bsSize="sm" onChange={this.handleChange} value={this.state.removeTarget} >
                                <option value=""></option>
                                {
                                    fetchTemplate(this.state.removeFormat).map((element) => {
                                        return (
                                            <option value={element} key={element}>{element}</option>
                                        )
                                    })
                                }
                            </Input>
                            <FormText>
                                {(this.props.lang === "en") ? "Please select the template you want to delete." : "削除したいテンプレートを選択してください。"}
                            </FormText>
                        </Col>
                        <Col sm={2}>
                            <Button color="danger" size="sm" onClick={this.remove} block>Remove</Button>
                        </Col>
                    </FormGroup>
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

export default connect(mapStateToProps)(Register);