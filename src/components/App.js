import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import ActiveSprint from "./dashboard/ActiveSprint";
import MessageBoard from "./dashboard/MessageBoard";
import Backlog from "./dashboard/Backlog";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <Sidebar />
          <Navbar />
          <Switch>
            <Route path="/" exact component={Backlog} />
            <Route path="/backlog" exact component={Backlog} />
            <Route path="/active" exact component={ActiveSprint} />
            <Route path="/board" exact component={MessageBoard} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
