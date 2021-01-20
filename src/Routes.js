import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Main } from "./Pages/Main/Main";
import { Login } from "./Pages/Login/Login";
import { SignUp } from "./Pages/SignUp/SignUp";
import { Details } from "./Pages/Details/Details";
import { Lists } from "./Pages/Lists/Lists";

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/SignUp" component={SignUp} />
          <Route exact path="/Details" component={Details} />
          <Route exact path="/Lists" component={Lists} />
        </Switch>
      </Router>
    );
  }
}
export default Routes;
