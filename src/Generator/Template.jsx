import React, { Component } from "react";
import { Row, Col, Button, FormGroup, Label, Input, Fade } from 'reactstrap';

import templateData from '../data/template.json';

import { CopyToClipboard } from 'react-copy-to-clipboard';

// Redux
import { connect } from "react-redux";
import {  } from "../Redux/actions";

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
        this.setState({
            [e.target.name]: e.target.value
        });
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
                <Col xs={11}>
                    <FormGroup>
                        <Input type="select" name="template" onChange={this.handleChange}>
                            <option value="">message template</option>
                            {
                                Object.keys(templateData).map((id) => {
                                    return (
                                        <option value={templateData[id].en} key={id}>{(this.props.lang === "en") ? templateData[id].en : `${templateData[id].en} ${templateData[id].ja}`}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <CopyToClipboard text={this.state.template} onCopy={this.copyAlert}>
                        <Button color="primary">Copy</Button>
                    </CopyToClipboard>
                    <Fade in={this.state.fadeIn} className="pt-2">
                        Copied!
                    </Fade>
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