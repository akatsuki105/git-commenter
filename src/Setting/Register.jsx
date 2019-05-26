import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, FormText } from "reactstrap";
import { connect } from "react-redux";
import { fetchTemplate } from "../util/util";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addTarget: "",
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
            let template = fetchTemplate(this.props.data);
            template.push(this.state.addTarget);
            localStorage.setItem(this.props.data, JSON.stringify(template));

            this.setState({
                addTarget: ""
            });
        }
    }

    remove() {
        const template = fetchTemplate(this.props.data);
        const newTemplate = template.filter(n => n !== this.state.removeTarget);
        localStorage.setItem(this.props.data, JSON.stringify(newTemplate));

        this.setState({
            removeTarget: ""
        });
    }

    render() {
        return (
            <React.Fragment>
                <Col xs={12}>{this.props.emoji} {this.props.data} Template</Col>
                <Col xs={12} className="my-1">

                    <FormGroup row>
                        <Col sm={5}>
                            <Input type="text" name="addTarget" bsSize="sm" onChange={this.handleChange} value={this.state.addTarget} />
                            <FormText>
                                {(this.props.lang === "en") ? `Please enter the ${this.props.data} you want to register as a template.` : `テンプレートとして登録したい${this.props.data}を入力してください。`}
                            </FormText>
                        </Col>
                        <Col sm={1}>
                            <Button color="primary" size="sm" onClick={this.add} block>Add</Button>
                        </Col>

                        <Col sm={5}>
                            <Input type="select" name="removeTarget" bsSize="sm" onChange={this.handleChange} value={this.state.removeTarget} >
                                <option value=""></option>
                                {
                                    fetchTemplate(this.props.data).map((element) => {
                                        return (
                                            <option value={element} key={element}>{element}</option>
                                        )
                                    })
                                }
                            </Input>
                            <FormText>
                                {(this.props.lang === "en") ? `Please select the ${this.props.data} you want to delete from the template.` : `テンプレートから削除したい${this.props.data}を選択してください。`}
                            </FormText>
                        </Col>
                        <Col sm={1}>
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