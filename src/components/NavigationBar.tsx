import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";
import { Box, AppBar, Toolbar, Typography } from "@mui/material";

import LogoIcon from "icons/logo.svg";
import { disconnect } from "store/actions";
import { selectAddress } from "store/selectors";
import State from "store/state";

type ContainerProps = {
  children: React.ReactNode;
};

const NavigationBar = (props: ContainerProps) => (
  <AppBar position="static">
    <Toolbar sx={{ display: "flex" }}>
      <Logo />
      <Box sx={{ flexGrow: 1 }}>{props.children}</Box>
    </Toolbar>
  </AppBar>

  /*   <div id="navigation-bar" className="inline-row">
    <Logo />
    <div id="navigation-buttons">{props.children}</div>
  </div> */
);

const Logo = () => (
  <Box display="flex" sx={{ flexGrow: 1 }}>
    <img src={LogoIcon} alt="Logo" width="5%" />
    <Typography variant="h5" width="50%" sx={{ ml: "0.5em", my: "auto" }}>
      Data Inspector
    </Typography>
  </Box>
  //<div id="navigation-logo" className="flex-row">
);

const Disconnect = () => {
  const store = Redux.useStore() as Store<State>;
  const history = Router.useHistory();

  function onClick() {
    const address = selectAddress(store.getState());
    Axios.get(address + "/stop").catch((_) => {
      /* */
    });
    store.dispatch(disconnect());
    history.push("/");
  }

  return (
    <button id="disconnect" onClick={onClick}>
      Disconnect
    </button>
  );
};

const SelectDevices = () => {
  const history = Router.useHistory();

  function onClick() {
    history.push("/selection");
  }

  return (
    <button id="select-devices" onClick={onClick}>
      Select Devices
    </button>
  );
};

export default NavigationBar;
export { Disconnect, SelectDevices };
