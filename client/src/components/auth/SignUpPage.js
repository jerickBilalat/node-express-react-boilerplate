import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";

class SignUpPage extends Component {
  onFormSubmit = e => {
    e.preventDefault();
    const { actions } = this.props;
    // check if form is valid
    // set signing up... to true

    const mockCredentials = {
      firstname: "john",
      lastname: "doe",
      email: "developer@example.com",
      role: "developer",
      password: "123"
    };
    // hit signup action
    return actions
      .signup(mockCredentials)
      .then(() => {
        const { history } = this.props;
        history.push("/");
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    return (
      <form>
        <input type="text" />
        <input type="email" />
        <input type="password" />
        <input type="submit" onClick={this.onFormSubmit} />
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpPage);
