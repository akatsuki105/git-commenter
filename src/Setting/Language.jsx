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
                <Col xs={12}><h5>{"🌎"} Language</h5></Col>
                <Col xs={12} className="mt-1 mb-4">
                    <Form>
                        <FormGroup>
                            <Label for="lang">{formLabel}</Label>
                            <Input type="select" name="lang" bsSize="sm" onChange={this.switchLang} value={this.props.lang} >
                                <option value="en">En</option>
                                <option value="ja">Ja</option>
                            </Input>
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