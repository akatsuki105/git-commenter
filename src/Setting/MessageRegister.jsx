// Messageのみ、要素ごとに保存する必要があるため別コンポーネント
import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, FormText, Row } from "reactstrap";
import { connect } from "react-redux";
import { fetchTemplate, constructMessage } from "../util/util";

class MessageRegister extends Component {

    constructor(props) {
        super(props);

        this.state = {
            target: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.remove = this.remove.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    remove() {
        const template = fetchTemplate("message");

        const targetId = Number(this.state.target);
        const target = template[targetId];

        const newTemplate = template.filter(n => n !== target);
        localStorage.setItem("message", JSON.stringify(newTemplate));

        this.setState({
            target: ""
        });
    }

    render() {
        return (
            <Col xs="12">
                <Form inline>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="target" className="mr-sm-2">{"🖨"} {(this.props.lang === "en") ? `Remove Message Template` : `テンプレートメッセージの削除`}</Label>
                        <Input type="select" name="target" bsSize="sm" onChange={this.handleChange} value={this.state.target} >
                            <option value=""></option>
                            {
                                fetchTemplate("message").map((element, id) => {
                                    return (
                                        <option value={id} key={id}>{constructMessage(element).message}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                    <Button color="danger" size="sm" onClick={this.remove}>Remove</Button>
                </Form>
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(MessageRegister);