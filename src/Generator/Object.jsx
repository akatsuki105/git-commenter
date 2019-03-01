import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import nounData from '../data/noun.json';

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class CommitObject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            objectForm: "",
            objectTemplate: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "objectForm") {
            this.setState({
                objectForm: e.target.value,
                objectTemplate: ""
            });
        } else if (e.target.name === "objectTemplate") {
            this.setState({
                objectForm: "",
                objectTemplate: e.target.value
            });
        }

        this.props.dispatch(addElement("object", e.target.value));
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"⚽️ Object"}</Label></Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="select" name="objectTemplate" onChange={this.handleChange} value={this.state.objectTemplate} >
                            <option value="">{(this.props.lang === "en") ? "object of commit" : "コミットの対象"}</option>
                            {
                                Object.keys(nounData).map((noun) => {
                                    return (
                                        <option value={noun} key={noun}>{(this.props.lang === "en") ? noun : `${noun}  ${nounData[noun].ja}`}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="text" name="objectForm" onChange={this.handleChange} value={this.state.objectForm} placeholder="Form" />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        object: state.message.object
    };
};

export default connect(mapStateToProps)(CommitObject);