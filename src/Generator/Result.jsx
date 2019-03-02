import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Fade } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchTemplate } from "../util/util";

// Redux
import { connect } from "react-redux";
import { overwrite } from "../Redux/actions";

class Result extends Component {

    constructor(props) {
        super(props);

        this.state = { fadeIn: false };

        this.toggle = this.toggle.bind(this);
        this.copyAlert = this.copyAlert.bind(this);
        this.register = this.register.bind(this);
        this.reset = this.reset.bind(this);
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

    // 出来上がったコミットメッセージをテンプレとして保存しておく機能
    register() {
        const message = this.props.result;
        
        let messageTemplate = fetchTemplate("message");
        messageTemplate.push(message);
        localStorage.setItem("message", JSON.stringify(messageTemplate));
    }

    reset() {
        const action = {
            emoji: "",
            verb: "",
            adjective: "",
            object: "",
            adverbList: [],
            counter: 0
        }
        this.props.dispatch(overwrite(action));
    }

    render() {
        return (
            <React.Fragment>

                <FormGroup className="py-3">
                    <Label for="gitComment">{"🎊 Git Comment"}</Label>
                    <Input type="textarea" name="gitComment" disabled value={this.props.result}></Input>
                </FormGroup>

                <CopyToClipboard text={this.props.result} onCopy={this.copyAlert}>
                    <Button color="primary">Copy</Button>
                </CopyToClipboard>

                <Button className="mx-3" onClick={this.register}>Register</Button>

                <Button color="danger" onClick={this.reset}>Reset</Button>

                <Fade in={this.state.fadeIn} className="pt-2">
                    Copied!
                </Fade>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Result);