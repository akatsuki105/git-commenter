import React, { Component } from "react";
import { Button, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import { fetchTemplate } from "../util/util";

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class Reason extends Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.dispatch(addElement("reason", e.target.value));
    }

    render() {
        return (
            <Row form>
                <Col xs={12}><Label for="reason">{"❓ Reason"}</Label></Col>
                <Col xs={11}>
                    <FormGroup>
                        <Input type="text" name="reason" list="reason-tmpl" onChange={this.handleChange} value={this.props.reason} autoComplete="off" />
                        <datalist id="reason-tmpl">
                            {
                                fetchTemplate("reason").map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                        </datalist>
                        {/* <FormText color="muted">
                                {(this.props.lang === "en") ? "User can enter freely." : "ユーザーが自由に入力できます。"}
                            </FormText> */}
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline color="primary" onClick={(() => { this.props.dispatch(addElement("reason", "")) })} block>Reset</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        reason: state.message.reason,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Reason);