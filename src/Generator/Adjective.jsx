import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Col, Row, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import adjectiveData from '../data/adjective.json';

class Adjective extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.dispatch(addElement("adjective", e.target.value));
    }

    render() {
        return (
            <Row form>
                <Col xs={12}><Label for="adjective">{"✨ Adjective"}</Label></Col>
                <Col xs={11}>
                    <FormGroup>
                        <Input type="text" name="adjective" list="adjective-tmpl" onChange={this.handleChange} value={this.props.adjective} autoComplete="off" />
                        <datalist id="adjective-tmpl">
                            {
                                fetchTemplate("adjective").map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                            {
                                Object.keys(adjectiveData).map((adjective) => {
                                    return (
                                        <option value={adjective} key={adjective}>{(this.props.lang === "en") ? adjective : `${adjective} ${adjectiveData[adjective].ja}`}</option>
                                    )
                                })
                            }
                        </datalist>
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "This is where you enter words that qualify Object. You do not have to enter if you do not need it.  e.g. new, unused " : "コミットの対象(Object)を修飾する語句を入力するところです。必要がないならば無理に入力する必要はありません。 例:「new」,「unused」"}
                        </FormText>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline color="primary" onClick={(() => { this.props.dispatch(addElement("adjective", "")) })} block>Reset</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adjective: state.message.adjective,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Adjective);