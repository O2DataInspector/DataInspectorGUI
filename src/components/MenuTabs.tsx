import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import NavigationBar, * as Buttons from "components/NavigationBar";
import { setMessages } from "store/actions";
import { selectAddress, selectSelectedDevices } from "store/selectors";
import State, { Device, Message } from "store/state";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Store } from "redux";
import { Container, Box } from "@mui/system";
import { Tabs, Tab } from "@mui/material";
import { Card, CardContent, CardActionArea } from "@mui/material";

const MenuTabs = () => {
    const location = Router.useLocation();

    return (
<Tabs value={location.pathname} variant="fullWidth">
    <Tab label="Dashboard" value="/dashboard" to="/dashboard" component={Router.Link} />
    <Tab label="Statistics" value="/stats" to="/stats" component={Router.Link} />
</Tabs>
    );
  };

export default MenuTabs;
