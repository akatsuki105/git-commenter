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
        let template = fetchTemplate("object");
        template.push(this.state.addTarget);
        localStorage.setItem("object", JSON.stringify(template));

        this.setState({
            addTarget: ""
        });
    }

    remove() {
        const template = fetchTemplate("object");
        const newTemplate = template.filter(n => n !== this.state.removeTarget);
        localStorage.setItem("object", JSON.stringify(newTemplate));

        this.setState({
            removeTarget: ""
        });
    }

    render() {
        return (
            <React.Fragment>
                <Col xs={12} className="my-1">
                    <Form>
                        <FormGroup>
                            <Label for="addTarget">Add {this.props.data} in template</Label>
                            <Input type="text" name="addTarget" onChange={this.handleChange} value={this.state.addTarget} />
                            <FormText>
                                {(this.props.lang === "en") ? `Please enter the ${this.props.data} you want to register as a template.` : `テンプレートとして登録したい${this.props.data}を入力してください。登録した目的語は${this.props.data}のテンプレ一覧に追加されます。`}
                            </FormText>
                        </FormGroup>
                        <Button color="primary" onClick={this.add}>Add</Button>
                    </Form>
                </Col>
                <Col xs={12} className="my-1">
                    <Form>
                        <FormGroup>
                            <Label for="removeTarget">Remove {this.props.data} from template</Label>
                            <Input type="select" name="removeTarget" onChange={this.handleChange} value={this.props.removeTarget} >
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

export default connect(mapStateToProps)(Register);