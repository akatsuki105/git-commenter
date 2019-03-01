import React, { Component } from "react";
import { Row, Col, FormGroup, Label, Input } from 'reactstrap';

import adjectiveData from '../data/adjective.json';

class Adjective extends Component {

    constructor(props) {
        super(props);

        this.state = {
            adjectiveForm: "",
            adjectiveTemplate: "",
            adjective: ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === "adjectiveForm") {
            this.setState({
                adjectiveForm: e.target.value,
                adjectiveTemplate: "",
                adjective: e.target.value
            });
        } else if (e.target.name === "adjectiveTemplate") {
            this.setState({
                adjectiveForm: "",
                adjectiveTemplate: e.target.value,
                adjective: e.target.value
            });
        }

        this.props.onUpdate("adjective", e.target.value);
    }

    render() {
        return (
            <Row form>
                <Col md={12}><Label>{"✨ Adjective"}</Label></Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="select" name="adjectiveTemplate" onChange={this.handleChange} value={this.state.adjectiveTemplate} >
                            <option value="">{(this.props.lang === "en") ? "adjective" : "コミット対象の形容詞"}</option>
                            {
                                Object.keys(adjectiveData).map((adjective) => {
                                    return (
                                        <option value={adjective} key={adjective}>{(this.props.lang === "en") ? adjective : `${adjective}  ${adjectiveData[adjective].ja}`}</option>
                                    )
                                })
                            }
                        </Input>
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Input type="text" name="adjectiveForm" onChange={this.handleChange} value={this.state.adjectiveForm} placeholder="Form" />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

export default Adjective;