import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import Header from "./header";
import ManageEventPage from "./event/ManageEventPage";
import SignUpPage from "./auth/SignUpPage";
import SignInPage from "./auth/SignInPage";

const App = () => (
  <div>
    <BrowserRouter>
      <div>
        <Header />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/event/manage" component={ManageEventPage} />
        <Route exact path="/event/manage/:id" component={ManageEventPage} />
        <Route exact path="/auth/signup" component={SignUpPage} />
        <Route exact path="/auth/signin" component={SignInPage} />
      </div>
    </BrowserRouter>
  </div>
);

export default App;
