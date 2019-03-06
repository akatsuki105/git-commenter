import React, { Component } from "react";
import { Button, FormGroup, Label, Input, Fade } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchTemplate, constructMessage } from "../util/util";

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
        try {
            const message = this.props.message;

            let template = fetchTemplate("message");
            template.push(message);
            localStorage.setItem("message", JSON.stringify(template));

            window.alert("メッセージの登録に成功しました");

            this.reset();
        } catch (error) {
            console.error(error);
            window.alert("メッセージの登録に失敗しました");
        }
    }

    reset() {
        const action = {
            emoji: "",
            verb: "",
            adjective: "",
            object: "",
            modifier: "",
            reason: ""
        }
        this.props.dispatch(overwrite(action));
    }

    componentWillUnmount() {
        this.reset();
    }

    render() {
        const message = this.props.message;
        let result = constructMessage(message);
        return (
            <React.Fragment>

                <FormGroup className="py-3">
                    <Label for="gitComment">{"🎊 Git Comment"}</Label>
                    <Input type="textarea" name="gitComment" disabled value={result} style={{ resize: "horizontal", height: "100px"}}></Input>
                </FormGroup>

                <CopyToClipboard text={result} onCopy={this.copyAlert}>
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
        message: state.message,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Result);