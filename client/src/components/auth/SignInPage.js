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
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
      errors: {}
    };
  }

  componentWillMount() {
    const { actions } = this.props;
    actions.signout();
  }

  onFormSubmit = e => {
    e.preventDefault();
    const { actions, history } = this.props;
    const { credentials } = this.state;
    return actions
      .signin(credentials)
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        throw error;
      });
  };

  // hanlde input change
  onInputChange = e => {
    const { credentials } = this.state;
    const { target } = e;
    const { name, value } = target;
    const updatedCredentials = { ...credentials };
    updatedCredentials[name] = value;
    return this.setState({ credentials: updatedCredentials });
  };

  signInFormIsValid() {
    let isFormValid = true;
    const errors = {};
    const { credentials } = this.state;

    if (credentials.email.length < 6) {
      errors.email = "Title or password must be more than 6 characters";
      isFormValid = false;
    }

    if (credentials.password.length < 6) {
      errors.password = "Password must be more than 6 chracters";
      isFormValid = false;
    }

    this.setState({ errors });
    return isFormValid;
  }

  render() {
    const { errors } = this.state;
    return (
      <form>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.email}</span>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.password}</span>}
        <input type="submit" onClick={this.onFormSubmit} />
      </form>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInPage);
