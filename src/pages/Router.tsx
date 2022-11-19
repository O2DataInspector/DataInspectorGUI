import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Connection from "pages/Connection";
import Dashboard from "pages/Dashboard";
import DeviceOverview from "pages/DeviceOverview";
import Selection from "pages/Selection";
import StatisticsOverview from "./StatisticsOverview";
import RunsList from "./RunsList";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Connection} />
      <Route path="/runs" exact component={RunsList} />
      <Route path="/runs/:runId/dashboard" exact component={Dashboard} />
      <Route path="/runs/:runId/overview/:name" exact component={DeviceOverview} />
      <Route path="/runs/:runId/selection" exact component={Selection} />
      <Route path="/runs/:runId/stats" exact component={StatisticsOverview} />
    </Switch>
  </BrowserRouter>
);

export default Router;
