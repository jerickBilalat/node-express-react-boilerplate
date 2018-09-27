import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  renderLinks() {
    const { auth } = this.props;

    return !auth.userCredentials ? (
      <nav>
        <Link to="/auth/signup">Sign Up | </Link>
        <Link to="/auth/signin">Sign In | </Link>
      </nav>
    ) : (
      <nav>
        <Link to="/auth/signin">Sign Out</Link>
      </nav>
    );
  }

  render() {
    return (
      <div>
        <h3>
          <Link to="/">NLCF Admin</Link>
        </h3>
        {this.renderLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.authReducer
  };
}

export default connect(
  mapStateToProps,
  null
)(Header);
