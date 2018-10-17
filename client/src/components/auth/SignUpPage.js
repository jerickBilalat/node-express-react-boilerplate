import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as authActions from "../../actions/authActions";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      credentials: {},
      confirmPasswordKey: "",
      signing: false,
      errors: {}
    };
  }

  onInputChange = e => {
    const { credentials } = this.state;
    const { target } = e;
    const { name, value } = target;
    const updatedCredentials = { ...credentials };
    if (name === "confirmPasswordKey") {
      return this.setState({ confirmPasswordKey: value });
    }
    updatedCredentials[name] = value;
    return this.setState({ credentials: updatedCredentials });
  };

  onFormSubmit = e => {
    e.preventDefault();
    const { actions } = this.props;
    const { credentials } = this.state;
    if (!this.formIsValid()) return null;

    this.setState({ signing: true });

    return actions
      .signup(credentials)
      .then(() => {
        const { history } = this.props;
        this.setState({ signing: false });
        history.push("/");
      })
      .catch(error => {
        throw error;
      });
  };

  formIsValid() {
    let isFormValid = true;
    const errors = {};
    const { credentials } = this.state;
    const { confirmPasswordKey } = this.state;

    if (credentials.password.length < 6) {
      errors.password = "Password must be more than 6 chracters";
      isFormValid = false;
    }

    if (confirmPasswordKey !== credentials.password) {
      errors.confirmPasswordKey = "Password did not match";
      errors.password = "Password did not match";
      isFormValid = false;
    }

    this.setState({ errors });
    return isFormValid;
  }

  isFormClean() {
    const { credentials } = this.state;
    let formIsClean = true;
    if (
      Object.keys(credentials).length === 5 &&
      (credentials.firstName.length > 0 &&
        credentials.lastName.length > 0 &&
        credentials.role.length > 0 &&
        credentials.password.length > 0 &&
        credentials.email.length > 0 &&
        credentials.password.length > 0)
    ) {
      formIsClean = false;
    }
    return formIsClean;
  }

  render() {
    const { errors, signing } = this.state;
    return (
      <form>
        <input
          type="text"
          name="role"
          placeholder="role"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.role}</span>}
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.firstName}</span>}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.lastName}</span>}
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
          type="password"
          name="confirmPasswordKey"
          placeholder="Confirm Password"
          onChange={this.onInputChange}
        />
        {errors && <span>{errors.confirmPasswordKey}</span>}
        <input
          type="submit"
          value={signing ? "Signing Up..." : "Submit"}
          onClick={this.onFormSubmit}
          disabled={this.isFormClean()}
        />
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
