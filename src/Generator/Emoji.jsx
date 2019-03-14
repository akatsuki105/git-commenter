import React, { Component } from "react";
import { connect } from "react-redux";
import { addElement } from "../Redux/actions";
import { FormGroup, Label, Input, FormText } from 'reactstrap';
import Aws from "../util/aws";

class Emoji extends Component {

    constructor(props) {
        super(props);

        this.state = {
            emojiTmpls: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        const tmpls = await Aws.fetchTmpls("emoji", 50);

        this.setState({
            emojiTmpls: tmpls
        })
    }

    handleChange(e) {
        this.props.dispatch(addElement("emoji", e.target.value));
    }

    render() {
        const emojiData = this.state.emojiTmpls;
        return (
            <FormGroup>
                <Label for="emoji">{"😉 Emoji"}</Label>
                <Input type="select" name="emoji" onChange={this.handleChange} value={this.props.emoji}>
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