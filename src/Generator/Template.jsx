import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';
import templateData from '../data/template.json';
import { fetchTemplate, constructMessage } from "../util/util";

// Redux
import { connect } from "react-redux";
import { overwrite } from "../Redux/actions";

class Template extends Component {

    constructor(props) {
        super(props);

        this.state = {
            template: "",
            fadeIn: false
        };

        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.copyAlert = this.copyAlert.bind(this);
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    handleChange(e) {
        if (e.target.name === "template") {
            const initial = e.target.value[0];

            let element;
            if (initial === "m") {
                let id = Number(((e.target.value).split("#"))[1]);
                let template = fetchTemplate("message");
                element = template[id];
            } else if (initial === "t") {
                let id = Number(((e.target.value).split("#"))[1]);
                element = templateData[id];
            } else {
                element = {
                    emoji: "", verb: "", adjective: "", object: "", modifier: "", reason: ""
                };
            }
            const message = {
                emoji: element.emoji,
                verb: element.verb,
                adjective: element.adjective,
                object: element.object,
                modifier: element.modifier,
                reason: element.reason
            }
            this.props.dispatch(overwrite(message));

            this.setState({
                template: constructMessage(message)
            });
        }
    }

    copyAlert() {
        this.toggle();

        setTimeout(() => {
            this.toggle();
        }, 1000);
    }

    render() {
        return (
            <Row form>
                <Col xs={12}><Label for="template">{"🖨 Template"}</Label></Col>
                <Col xs={12}>
                    <FormGroup>
                        <Input type="select" name="template" onChange={this.handleChange} value={this.state.template}>
                            <option value="">message template</option>
                            {
                                fetchTemplate("message").map((element, id) => {
                                    return (
                                        <option value={`m#${id}`} key={id}>{constructMessage(element)}</option>
                                    )
                                })
                            }
                            {
                                Object.keys(templateData).map((id) => {
                                    return (
                                        <option value={`t#${id}`} key={id}>{(this.props.lang === "en") ? templateData[id].en : `${templateData[id].en} ${templateData[id].ja}`}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Template);