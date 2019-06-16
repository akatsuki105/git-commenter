import React, { Component } from "react";
import { Col } from "reactstrap";
import { connect } from "react-redux";

class Usage extends Component {
    render() {
        const lang = this.props.lang;
        return (
            <Col xs={12} className="my-3">
                {((lang === "en") ? (
                    <React.Fragment>
                        <h5>{"❓ Usage of this site"}</h5>
                        <p>Complete the commit message by giving words and phrases in the following order: emoji, verb, object, modifier, and reason.</p>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <h5>{"❓ このサイトの使い方"}</h5>
                        <p>emoji、verb、object、modifier、bodyの順に単語やフレーズを与えていくことでコミットメッセージを完成させましょう。</p>
                        <p>emojiはコミットメッセージのカテゴリを識別しやすくするための接頭辞、verbはコミット内容を表す動詞、objectはコミット対象を表す名詞、modifierはコミット文を修飾する文章や副詞、bodyはコミット理由や具体的コミット内容を表します。</p>
                        <p>verbやobjectの欄にあるテンプレにはgitのコミットメッセージで頻出する単語が登録されています。困ったら利用してください。フォームは自由入力欄です。</p>
                        <p>objectの欄にあるヒントにはverbでテンプレにある動詞を選んだときのみ、verbと共に使われるフレーズが登録されています。こちらも困ったら利用してください。</p>
                        <p>一番下のTemplateにはよく利用されるコミットメッセージそのものが登録されています。そのまま使うも良し、少し改変して使うも良しです。</p>
                    </React.Fragment>
                ))}
            </Col>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(Usage);