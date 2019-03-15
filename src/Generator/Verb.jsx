import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { Row, Col, Button, FormGroup, Label, Input, FormText } from 'reactstrap';
import { fetchTemplate } from "../util/util";
import Aws from "../util/aws";

class Verb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            verbTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("verb", 50);

        this.setState({
            verbTmpls: tmpls
        })
    }

    handleChange(e) {
        this.props.dispatch(addElement("verb", e.target.value));
    }

    render() {
        const verbData = this.state.verbTmpls;
        return (
            <Row form>
                <Col xs={12}><Label for="verb">{"🚵🏼‍ Verb"}</Label></Col>
                <Col xs={11} sm={11}>
                    <FormGroup>
                        <Input type="text" name="verb" list="verb-tmpl" onChange={this.handleChange} value={this.props.verb} autoComplete="off" />
                            <datalist id="verb-tmpl">
                                {
                                    fetchTemplate("verb").map((element) => {
                                        return (
                                            <option value={element} key={element} >{element}</option>
                                        )
                                    })
                                }
                                {
                                    Object.keys(verbData).map((verb) => {
                                        return (
                                            <option value={verb} key={verb}>{(this.props.lang === "en") ? verb : `${verb} ${verbData[verb].ja}`}</option>
                                        )
                                    })
                                }
                            </datalist>
                        <FormText color="muted">
                            {(this.props.lang === "en") ? "User can enter freely." : "コミット内容を入力するところです。 例 : 何かを追加した=> 「Add」"}
                        </FormText>
                    </FormGroup>
                </Col>
                <Col xs={1}>
                    <Button outline color="primary" onClick={(() => { this.props.dispatch(addElement("verb", "")) })} block>Reset</Button>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        verb: state.message.verb,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Verb);