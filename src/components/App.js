import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Dashboard from "./dashboard/Dashboard";
import Home from "./home/Home";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/:dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
        <ToastContainer />
      </>
    );
  }
}

export default App;
