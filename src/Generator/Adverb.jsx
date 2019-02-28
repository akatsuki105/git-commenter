import React, { Component } from "react";
import { Row, Button, Col, Label, FormText } from 'reactstrap';

import AdverbFrom from "./AdverbForm";

class Adverb extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            adverbList: []
        };

        this.updateAdverb = this.updateAdverb.bind(this);
        this.renderAdverb = this.renderAdverb.bind(this);
        this.addAdverb = this.addAdverb.bind(this);
        this.removeAdverb = this.removeAdverb.bind(this);
    }

    updateAdverb(id, adverb) {
        let adverbList = this.state.adverbList;
        adverbList[id] = adverb;
        this.setState({
            adverbList: adverbList
        });

        this.props.onUpdate("adverb", adverbList.join(" "));
    }

    renderAdverb() {
        const adverbComponent = [];
        
        for (let i = 0; i < this.state.counter; i++) {
            adverbComponent.push(<AdverbFrom key={i} id={i} onUpdate={this.updateAdverb} />)
        }

        return adverbComponent;
    }

    addAdverb() {
        let adverbList = this.state.adverbList;
        adverbList.push([])
        this.setState({
            counter: this.state.counter + 1,
            adverbList: adverbList
        })
    }

    removeAdverb() {
        if (this.state.counter > 0) {
            let adverbList = this.state.adverbList;
            adverbList.pop();
            this.setState({
                counter: this.state.counter - 1,
                adverbList: adverbList
            })
        }
    }

    render() {
        return (
            <Row>
                <Col md={12}>
                    <Label for="verb">Adverb</Label>
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

export default Adverb;