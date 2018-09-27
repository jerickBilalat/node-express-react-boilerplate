import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

class SignInPage extends Component {
  componentDidMount() {
    const { actions } = this.props;
    actions.signout();
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { actions, history } = this.props;
    const mockUserCredentials = {
      email: "developer@example.com",
      password: "123"
    };
    return actions
      .signin(mockUserCredentials)
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        throw error;
      });
  };

  render() {
    return (
      <form>
        <input type="email" />
        <input type="password" />
        <input type="submit" onClick={this.onFormSubmit} />
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
