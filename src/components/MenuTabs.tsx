import React from "react";
import { Tabs, Tab } from "@mui/material";
import {Link, useLocation} from "react-router-dom";

interface MenuTabsProps {
  runId: string;
}

const MenuTabs = ({ runId }: MenuTabsProps) => {
  const location = useLocation();

  return (
    <Tabs value={location.pathname} variant="fullWidth">
      <Tab
        label="Dashboard"
        value={`/runs/${runId}/dashboard`}
        to={`/runs/${runId}/dashboard`}
        component={Link}
      />
      <Tab
        label="Statistics"
        value={`/runs/${runId}/stats`}
        to={`/runs/${runId}/stats`}
        component={Link}
      />
    </Tabs>
  );
};

export default MenuTabs;
