import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Dashboard from "./dashboard";
import Header from "./header";
import ManageEventPage from "./event/ManageEventPage";
import SignUpPage from "./auth/SignUpPage";
import SignInPage from "./auth/SignInPage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this._notificationSystem = null;
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  addNotification = (level, message) => {
    this._notificationSystem.addNotification({
      message,
      level
    });
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <NotificationSystem ref="notificationSystem" />
            <Route
              exact
              path="/"
              render={props => (
                <Dashboard {...props} notify={this.addNotification} />
              )}
            />
            <Route
              exact
              path="/event/manage"
              render={props => (
                <ManageEventPage {...props} notify={this.addNotification} />
              )}
            />
            <Route
              exact
              path="/event/manage/:id"
              render={props => (
                <ManageEventPage {...props} notify={this.addNotification} />
              )}
            />
            <Route exact path="/auth/signup" component={SignUpPage} />
            <Route exact path="/auth/signin" component={SignInPage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
