import React, { Component } from 'react';

import { Navbar, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Link } from "react-router-dom";
import "./Navbar.css";

// Redux
import { connect } from "react-redux";
import { switchLang } from "../Redux/actions";

class AppNavbar extends Component {
    constructor(props) {
        super(props);

        this.switchLang = this.switchLang.bind(this);
    }

    switchLang(e) {
        this.props.dispatch(switchLang(e.target.value));
    }

    render() {
        return (
            <div className="header">
                <Navbar light expand="md">
                    <NavbarBrand tag={Link} to="/">
                        {"⚔️ Git Commenter ⚔️"}
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>

                        <NavItem>
                            <NavLink tag={Link} to="/setting"><span role="img" aria-label="wrench">⚙️</span> Setting</NavLink>
                        </NavItem>

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <span role="img" aria-label="earth">🌎</span> {this.props.lang}
                            </DropdownToggle>

                            <DropdownMenu right>
                                <DropdownItem value="en" onClick={this.switchLang}>
                                    en
                                </DropdownItem>
                                <DropdownItem value="ja" onClick={this.switchLang}>
                                    ja
                                </DropdownItem>
                            </DropdownMenu>

                        </UncontrolledDropdown>

                    </Nav>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    };
};

export default connect(mapStateToProps)(AppNavbar);
