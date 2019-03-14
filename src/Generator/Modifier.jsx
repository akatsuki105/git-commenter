import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Button, Row, Col, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";

class Modifier extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.dispatch(addElement("modifier", e.target.value));
    }

    render() {
        return (
            <Row form>
                <Col xs={12}><Label for="modifier">{"💎 Modifier"}</Label></Col>
                <Col xs={11}>
                    <FormGroup>
                        <Input type="text" name="modifier" list="modifier-tmpl" onChange={this.handleChange} value={this.props.modifier} autoComplete="off" />
                        <datalist id="modifier-tmpl">
                            {
                                fetchTemplate("modifier").map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                        </datalist>
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "It is a place to add something you want to add other than Verb or Adjective or Object. For example, location, time, condition, purpose etc." : "コミット内容やコミット対象以外で、他に付け加えたいものを付け加える場所です。例としては、場所や時間、目的などです。"}
                        </FormText>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline color="primary" onClick={(() => { this.props.dispatch(addElement("modifier", "")) })} block>Reset</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modifier: state.message.modifier,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Modifier);