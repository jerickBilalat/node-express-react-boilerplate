import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
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
    const mockCredentials = {
      email: "administrator@example.com",
      password: "Passw@rd1"
    };
    return actions
      .signin(mockCredentials)
      .then(() => {
        history.push("/");
      })
      .catch(error => {
        const { auth } = this.props;
        return this.setState({ errors: { errorMessage: auth.errorMessage } });
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

    if (Object.keys(credentials).length === 0) {
      isFormValid = false;
    }

    if (Object.keys(credentials).length === 0 || credentials.email.length < 6) {
      errors.email = "Title or password must be more than 6 characters";
      isFormValid = false;
    }

    if (
      Object.keys(credentials).length === 0 ||
      credentials.password.length < 6
    ) {
      errors.password = "Password must be more than 6 chracters";
      isFormValid = false;
    }

    this.setState({ errors });
    return isFormValid;
  }

  isFormClean() {
    const { credentials } = this.state;
    let formIsClean = true;
    if (
      Object.keys(credentials).length > 0 &&
      (credentials.email &&
        credentials.email.length > 0 &&
        credentials.password &&
        credentials.password.length > 0)
    ) {
      formIsClean = false;
    }
    return formIsClean;
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <form>
          {errors && <span>{errors.errorMessage}</span>}
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
          <input
            type="submit"
            onClick={this.onFormSubmit}
            value="submit"
            disabled={this.isFormClean()}
          />
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInPage);
