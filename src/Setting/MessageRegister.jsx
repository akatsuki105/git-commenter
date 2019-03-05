// Messageのみ、要素ごとに保存する必要があるため別コンポーネント
import React, { Component } from "react";
import { Button, Col, Form, FormGroup, Input, Label, FormText } from "reactstrap";
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
            <React.Fragment>
                <Col xs={12}><h4>{"🖨"} Message Template</h4></Col>
                <Col xs={12} className="mt-1 mb-4">
                    <Form>
                        <FormGroup>
                            <Label for="target">Remove Message from template</Label>
                            <Input type="select" name="target" onChange={this.handleChange} value={this.state.target} >
                                <option value=""></option>
                                {
                                    fetchTemplate("message").map((element, id) => {
                                        return (
                                            <option value={id} key={id}>{constructMessage(element)}</option>
                                        )
                                    })
                                }
                            </Input>
                            <FormText>
                                {(this.props.lang === "en") ? `Please select the Message you want to delete from the template.` : `テンプレートから削除したいメッセージを選択してください。`}
                            </FormText>
                        </FormGroup>
                        <Button color="danger" onClick={this.remove}>Remove</Button>
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

export default connect(mapStateToProps)(MessageRegister);