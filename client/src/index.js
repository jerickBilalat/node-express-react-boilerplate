import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.dev";

import Dashboard from "./components/dashboard";
import Header from "./components/header";
import ManageEventPage from "./components/event/ManageEventPage";
import SignUpPage from "./components/auth/SignUpPage";
import SignInPage from "./components/auth/SignInPage";

import "./styles.css";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
