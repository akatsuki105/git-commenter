import React, { Component } from "react";
import { connect } from "react-redux";
import { overwrite } from "../Redux/actions";
import { Button, Col, FormGroup, Label, Input, Fade, FormFeedback, FormText, Row } from 'reactstrap';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fetchTemplate, constructMessage } from "../util/util";
import Aws from "../util/aws";

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
        const message = this.props.message;
        Aws.addTmplCtr("emoji", message.emoji);
        Aws.addTmplCtr("verb", message.verb);
        Aws.addTmplCtr("adjective", message.adjective);
        Aws.addTmplCtr("object", message.object);

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
        const elements = this.props.message;
        // 出来上がったコミットメッセージ、要約の文字数、理由の文字数
        let { message, subjectCount, reasonCount } = constructMessage(elements);
        
        // Messageの文字数をカウントして、既定の文字数を超えていたら警告文を出す
        let resultStatus = ((subjectCount > 50) || (reasonCount > 72));
        let warning = "";
        if ((subjectCount > 50) && (reasonCount <= 72)) {
            warning += (this.props.lang === "en") ? `The number of characters in the subject must be within 50 characters.` : `要約の文字数は50文字以内にする必要があります。`
        } else if ((subjectCount <= 50) && (reasonCount > 72)) {
            warning += (this.props.lang === "en") ? `The number of characters in the reason must be within 72 characters.` : `コミット理由の文字数は72文字以内にする必要があります。`
        } else if ((subjectCount > 50) && (reasonCount > 72)) {
            warning += (this.props.lang === "en") ? `The number of characters for subject and reason must be within 50 and 72 characters respectively.` : `要約とコミット理由の文字数はそれぞれ50、72文字以内に収める必要があります。`
        }

        return (
            <Row>
                <Col xs="12">
                    <FormGroup>
                        <Label for="gitComment">{"🎊 Git Comment"}</Label>
                        <Input type="textarea" name="gitComment" disabled value={message} style={{ resize: "horizontal", height: "100px" }} invalid={resultStatus}></Input>
                        <FormFeedback>{warning}</FormFeedback>
                        <FormText>{(this.props.lang === "en") ? `The number of characters: Subject ${subjectCount}, Reason ${reasonCount}` : `現在の文字数: 要約${subjectCount}文字、理由${reasonCount}文字`}</FormText>
                    </FormGroup>
                </Col>

                <Col>
                    <CopyToClipboard text={message} onCopy={this.copyAlert}>
                        <Button size="sm" color="primary">Copy</Button>
                    </CopyToClipboard>

                    <Button className="mx-2" size="sm" onClick={this.register}>Register</Button>

                    <Button color="danger" size="sm" onClick={this.reset}>Reset</Button>

                    <Fade in={this.state.fadeIn} className="pt-1">
                        <small>Copied!</small>
                    </Fade>
                </Col>
            </Row>
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