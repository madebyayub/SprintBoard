import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Dashboard from "./dashboard/Dashboard";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/:dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
