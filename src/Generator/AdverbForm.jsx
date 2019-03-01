import React, { Component } from "react";
import { Col, FormGroup, Label, Input } from 'reactstrap';

import prepositionData from '../data/preposition.json';
import nounData from '../data/noun.json';

class AdverbForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            prepForm: "",
            prepTemplate: "",
            prep: "",
            pObjectForm: "",
            pObjectTemplate: "",
            pObject: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "prepForm") {
            this.setState({
                prepForm: e.target.value,
                prepTemplate: "",
                prep: e.target.value
            });
            this.props.onUpdate(this.props.id, e.target.value + " " + this.state.pObject);
        } else if (e.target.name === "prepTemplate") {
            this.setState({
                prepForm: "",
                prepTemplate: e.target.value,
                prep: e.target.value
            });
            this.props.onUpdate(this.props.id, e.target.value + " " + this.state.pObject);
        } else if (e.target.name === "pObjectForm") {
            this.setState({
                pObjectForm: e.target.value,
                pObjectTemplate: "",
                pObject: e.target.value
            });
            this.props.onUpdate(this.props.id, this.state.prep + " " + e.target.value);
        } else if (e.target.name === "pObjectTemplate") {
            this.setState({
                pObjectForm: "",
                pObjectTemplate: e.target.value,
                pObject: e.target.value
            });
            this.props.onUpdate(this.props.id, this.state.prep + " " + e.target.value);
        }
    }

    render() {
        return (
            <Col md={12}>
                <FormGroup row>
                    <Label for="prep" sm={2}>Prep.</Label>
                    <Col md={5}>
                        <FormGroup>
                            <Input type="select" name="prepTemplate" onChange={this.handleChange} value={this.state.prepTemplate} >
                                <option value=""></option>
                                {
                                    Object.keys(prepositionData).map((prep) => {
                                        return (
                                            <option value={prep} key={prep}>{(this.props.lang === "en") ? prep : `${prep} ${prepositionData[prep].ja}`}</option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Input type="text" name="prepForm" onChange={this.handleChange} value={this.state.prepForm} placeholder="Form" />
                        </FormGroup>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="prep" sm={2}>Object</Label>
                    <Col md={5}>
                        <FormGroup>
                            <Input type="select" name="pObjectTemplate" onChange={this.handleChange} value={this.state.pObjectTemplate} >
                                <option value=""></option>
                                {
                                    Object.keys(nounData).map((noun) => {
                                        return (
                                            <option value={noun} key={noun}>{(this.props.lang === "en") ? noun : `${noun} ${nounData[noun].ja}`}</option>
                                        )
                                    })
                                }
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Input type="text" name="pObjectForm" onChange={this.handleChange} value={this.state.pObjectForm} placeholder="Form" />
                        </FormGroup>
                    </Col>
                </FormGroup>
            </Col>
        );
    }
}

export default AdverbForm;