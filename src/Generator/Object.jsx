import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Col, Row, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import objectData from '../data/noun.json';

class CommitObject extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.dispatch(addElement("object", e.target.value));
    }

    render() {
        return (
            <Row form>
                <Col xs={12}><Label for="object">{"⚽️ Object"}</Label></Col>
                <Col xs={11}>
                    <FormGroup>
                        <Input type="text" name="object" list="object-tmpl" onChange={this.handleChange} value={this.props.object} autoComplete="off" />
                        <datalist id="object-tmpl">
                            {
                                fetchTemplate("object").map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                            {
                                Object.keys(objectData).map((object) => {
                                    return (
                                        <option value={object} key={object}>{(this.props.lang === "en") ? object : `${object} ${objectData[object].ja}`}</option>
                                    )
                                })
                            }
                        </datalist>
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "Please enter the object of the commit." : "コミットの対象を入力するところです。 例: バグを修正 => fix bug"}
                        </FormText>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline color="primary" onClick={(() => { this.props.dispatch(addElement("object", "")) })} block>Reset</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        object: state.message.object,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(CommitObject);