import React, { Component } from "react";
import { FormGroup, Label, Input, FormText } from 'reactstrap';

import emojiData from '../data/emoji.json';

class Emoji extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emoji : ""
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        this.props.onUpdate("emoji", e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <Label for="emoji">{"😉 Emoji"}</Label>
                <Input type="select" name="emoji" onChange={this.handleChange}>
                    <option value="">{(this.props.lang === "en") ? "commit category" : "カテゴリ"}</option>
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

export default Emoji;