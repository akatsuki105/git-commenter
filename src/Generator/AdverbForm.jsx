import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import prepositionData from '../data/preposition.json';

// Redux
import { connect } from "react-redux";

class AdverbForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            input: "select",
            prep: "",
            pObject: "",
            adverb: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "prep") {
            this.setState({
                prep: e.target.value
            });
            this.props.onUpdate(this.props.id, e.target.value + " " + this.state.pObject);
        } else if (e.target.name === "pObject") {
            this.setState({
                pObject: e.target.value
            });
            this.props.onUpdate(this.props.id, this.state.prep + " " + e.target.value);
        } else if (e.target.name === "adverb") {
            this.setState({
                prep: "",
                pObject: "",
                adverb: e.target.value
            });
            this.props.onUpdate(this.props.id, e.target.value);
        } else if (e.target.name === "input") {
            this.setState({
                input: e.target.value,
                prep: "",
                pObject: "",
                adverb: ""
            });
            this.props.onUpdate(this.props.id, "");
        }
    }

    renderInput() {
        if (this.state.input === "select") {
            return (
                <FormGroup row>
                    <Label for="prep" sm={1}>Prep.</Label>
                    <Col md={4}>
                        <FormGroup>
                            <Input type="select" name="prep" onChange={this.handleChange} value={this.state.prep} >
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

                    <Label for="prep" sm={1}>Object</Label>
                    <Col md={6}>
                        <FormGroup>
                            <Input type="text" name="pObject" onChange={this.handleChange} value={this.state.pObject} />
                        </FormGroup>
                    </Col>
                </FormGroup>
            )
        } else if (this.state.input === "form") {
            return (
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Input type="text" name="adverb" onChange={this.handleChange} value={this.state.adverb} />
                        </FormGroup>
                    </Col>
                </Row>
            )
        }
    }

    render() {
        return (
            <Col md={12}>
                
                <Row form>
                    <Col md={2}>
                        <FormGroup>
                            <Input type="select" name="input" onChange={this.handleChange} value={this.state.input} >
                                <option value="select">{(this.props.lang === "en") ? "template" : "テンプレ"}</option>
                                <option value="form">{(this.props.lang === "en") ? "form" : "フォーム"}</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={10}>
                        {this.renderInput()}
                    </Col>
                </Row>
            </Col>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(AdverbForm);