import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Connection from "pages/Connection";
import Dashboard from "pages/Dashboard";
import Overview from "pages/Overview";
import Selection from "pages/Selection";
import StatisticsOverview from "./StatisticsOverview";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Connection} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/overview/:name" exact component={Overview} />
      <Route path="/selection" exact component={Selection} />
      <Route path="/stats" exact component={StatisticsOverview} />
    </Switch>
  </BrowserRouter>
);

export default Router;
