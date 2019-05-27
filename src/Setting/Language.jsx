import React, { Component } from "react";
import { Col, Form, FormGroup, Input, Label } from "reactstrap";
import { connect } from "react-redux";
import { switchLang } from "../Redux/actions";

class Language extends Component {

    constructor(props) {
        super(props);

        this.switchLang = this.switchLang.bind(this);
    }

    switchLang(e) {
        this.props.dispatch(switchLang(e.target.value));
    }

    render() {
        const formLabel = (this.props.lang === "en") ? "Change Language" : "言語の変更"
        return (
            <React.Fragment>
                <Col xs={12}>{"🌎"} Language</Col>
                <Col xs={12} className="mt-1 mb-3">
                    <Form>
                        <FormGroup row>
                            <Label for="lang" sm={2}>{formLabel}</Label>
                            <Col sm={10}>
                                <Input type="select" name="lang" bsSize="sm" onChange={this.switchLang} value={this.props.lang} >
                                    <option value="en">En</option>
                                    <option value="ja">Ja</option>
                                </Input>
                            </Col>
                        </FormGroup>
                    </Form>
                </Col>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Language);