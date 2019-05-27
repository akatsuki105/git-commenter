import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import emojiData from '../data/emoji.json';

class Emoji extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.dispatch(addElement("emoji", e.target.value));
    }

    render() {
        return (
            <FormGroup>
                <Label for="emoji">{"😉 Emoji"}</Label>
                <Input type="select" bsSize="sm" name="emoji" onChange={this.handleChange} value={this.props.emoji}>
                    <option value=""></option>
                    {
                        Object.keys(emojiData).map((emoji) => {
                            return (
                                <option value={emoji} key={emoji}>{emoji} {(this.props.lang === "en") ? emojiData[emoji].en : emojiData[emoji].ja}</option>
                            )
                        })
                    }
                </Input>
                <FormText color="muted">
                    {(this.props.lang === "en") ? "Attaching an emoji makes it easier to understand the contents of the commit." : "絵文字を付けることでコミット内容がわかりやすくなります。"}
                </FormText>
            </FormGroup>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        emoji: state.message.emoji,
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Emoji);