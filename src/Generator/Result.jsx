import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Fade } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';

class Result extends Component {

    constructor(props) {
        super(props);

        this.state = { fadeIn: false };

        this.toggle = this.toggle.bind(this);
        this.copyAlert = this.copyAlert.bind(this);
    }

    toggle() {
        this.setState({
            fadeIn: !this.state.fadeIn
        });
    }

    copyAlert() {
        this.toggle();

        setTimeout(() => {
            this.toggle();
        }, 1000);
    }

    render() {
        return (
            <React.Fragment>
                <FormGroup className="py-3">
                    <Label for="gitComment">Git Comment</Label>
                    <Input type="textarea" name="gitComment" disabled value={this.props.result}></Input>
                </FormGroup>
                <CopyToClipboard text={this.props.result} onCopy={this.copyAlert}>
                    <Button color="primary">Copy</Button>
                </CopyToClipboard>
                <Fade in={this.state.fadeIn}>
                    Copied!
                </Fade>
            </React.Fragment>
        );
    }
}

export default Result;