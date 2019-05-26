import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, FormText, Label } from "reactstrap";
import { connect } from "react-redux";
import { fetchTemplate } from "../util/util";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            addFormat: "verb",
            addTarget: "",
        }

        this.handleChange = this.handleChange.bind(this);
        this.add = this.add.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
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

    render() {
        return (
            <React.Fragment>
                <Col xs={12}>Template Register</Col>
                <Col xs={12} className="my-1">

                    <Form inline>

                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="select" name="addFormat" bsSize="sm" onChange={this.handleChange} value={this.state.addFormat}>
                                <option value="verb">verb</option>
                                <option value="object">object</option>
                                <option value="modifier">modifier</option>
                                <option value="reason">reason</option>
                            </Input>
                        </FormGroup>

                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="text" name="addTarget" bsSize="sm" onChange={this.handleChange} value={this.state.addTarget} placeholder={(this.props.lang === "en") ? `Please enter the template you want to register.` : `登録したいテンプレートを入力してください。`} />
                        </FormGroup>

                        <Button color="primary" size="sm" onClick={this.add} block>Add</Button>
                        
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

export default connect(mapStateToProps)(Register);