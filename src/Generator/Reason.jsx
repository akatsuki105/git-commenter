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
                <Col xs={12}><Label for="reason">{"💪 Body"}</Label></Col>
                <Col xs={11}>
                    <FormGroup>
                        <Input type="text" bsSize="sm" name="reason" list="reason-tmpl" onChange={this.handleChange} placeholder={(this.props.lang === "en") ? "This is where you enter the details of your commit." : "コミット内容の詳細を書くところです。ここは日本語でも構いません。"} value={this.props.reason} autoComplete="off" />
                        <datalist id="reason-tmpl">
                            {
                                fetchTemplate("reason").map((element) => {
                                    return (
                                        <option value={element} key={element}>{element}</option>
                                    )
                                })
                            }
                        </datalist>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline size="sm" color="primary" onClick={(() => { this.props.dispatch(addElement("reason", "")) })} block>Reset</Button>
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