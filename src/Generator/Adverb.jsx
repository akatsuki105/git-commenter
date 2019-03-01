import React, { Component } from "react";
import { Row, Button, Col, Label, FormText } from 'reactstrap';

import AdverbFrom from "./AdverbForm";

// Redux
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";

class Adverb extends Component {

    constructor(props) {
        super(props);

        this.updateAdverb = this.updateAdverb.bind(this);
        this.renderAdverb = this.renderAdverb.bind(this);
        this.addAdverb = this.addAdverb.bind(this);
        this.removeAdverb = this.removeAdverb.bind(this);
    }

    updateAdverb(id, adverb) {
        let adverbList = this.props.adverbList;
        adverbList[id] = adverb;

        this.props.dispatch(addElement("adverbList", adverbList));
    }

    renderAdverb() {
        const adverbComponent = [];
        
        for (let i = 0; i < this.props.counter; i++) {
            adverbComponent.push(<AdverbFrom key={i} id={i} onUpdate={this.updateAdverb} />)
        }

        return adverbComponent;
    }

    addAdverb() {
        let adverbList = this.props.adverbList;
        adverbList.push([]);
        this.props.dispatch(addElement("adverbList", adverbList));
        this.props.dispatch(addElement("counter", this.props.counter + 1));
    }

    removeAdverb() {
        if (this.props.counter > 0) {
            let adverbList = this.props.adverbList;
            adverbList.pop();
            this.props.dispatch(addElement("adverbList", adverbList));
            this.props.dispatch(addElement("counter", this.props.counter - 1));
        }
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Label for="verb">{"💎 Adverb"}</Label>
                    <FormText color="muted">
                        {(this.props.lang === "en") ? "An adverb clause that qualifies the commit content." : "コミット内容を修飾する副詞節です。"}
                    </FormText>
                </Col>

                {this.renderAdverb()}

                <Col md={12}>
                    
                    <Row>
                        <Col md={6}>
                            <Button color="primary" onClick={this.addAdverb} block>Add adverb</Button>
                        </Col>
                        <Col md={6}>
                            <Button color="secondary" onClick={this.removeAdverb} block>Remove adverb</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        adverbList: state.message.adverbList,
        counter: state.message.counter,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Adverb);