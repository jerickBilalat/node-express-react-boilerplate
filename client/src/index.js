import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore.dev";
import { loadEvents } from "./actions/eventActions";

import Dashboard from "./components/dashboard";
import ManageEventPage from "./components/event/ManageEventPage";

import "./styles.css";

const store = configureStore();

store.dispatch(loadEvents());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/event/manage" component={ManageEventPage} />
          <Route exact path="/event/manage/:id" component={ManageEventPage} />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
