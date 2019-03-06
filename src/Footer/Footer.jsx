import React, { Component } from 'react';
import { connect } from "react-redux";
import "./Footer.css";

class AppFooter extends Component {

    render() {
        return (
            <footer className="footer mt-auto py-3">
                <div className="container">
                    <span className="text-muted">{"Git Commenter"}</span>
                    <div className="py-1">
                        <span className="px-1"><a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-text="Git Commenter" data-url={process.env.REACT_APP_SITE_URL} data-show-count="false">Tweet</a></span>
                        <span className="px-1"><a href="https://twitter.com/intent/tweet?screen_name=akatsuki_py&ref_src=twsrc%5Etfw" class="twitter-mention-button" data-show-count="false">Tweet to @akatsuki_py</a></span>
                    </div>
                </div>
            </footer>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(AppFooter);
