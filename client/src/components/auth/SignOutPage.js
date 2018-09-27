import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions/authActions";
import SignInPage from "./SignInPage";

class SignOutPage extends Component {
  componentDidMount() {
    const { signout } = this.props;
    signout();
  }

  render() {
    return <div />;
  }
}

export default connect(
  null,
  actions
)(SignOutPage);
