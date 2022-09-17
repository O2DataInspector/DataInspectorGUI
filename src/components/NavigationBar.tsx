import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";
import { Box, AppBar, Toolbar, Typography, Button, useTheme, createTheme, ThemeProvider } from "@mui/material";

import LogoIcon from "icons/logo.svg";
import { disconnect } from "store/actions";
import { selectAddress } from "store/selectors";
import State from "store/state";

type ContainerProps = {
  children: React.ReactNode;
};

const NavigationBar = (props: ContainerProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff"
      }
    }
  });


  return (
  <AppBar position="static">
    <Toolbar sx={{ display: "flex" }}>
      <Logo />
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}>{props.children}</Box>
      </ThemeProvider>
    </Toolbar>
  </AppBar>
);
};

const Logo = () => (
  <Box display="flex" sx={{ flexGrow: 1 }}>
    <img src={LogoIcon} alt="Logo" width="5%" />
    <Typography variant="h5" width="50%" sx={{ ml: "0.5em", my: "auto" }}>
      Data Inspector
    </Typography>
  </Box>
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
    <Button variant="outlined" color="primary" onClick={onClick}>
      Disconnect
    </Button>
  );
};

const SelectDevices = () => {
  const history = Router.useHistory();

  function onClick() {
    history.push("/selection");
  }

  return (
    <Button variant="outlined" onClick={onClick} sx={{mx: "1em"}}>
      Select Devices
    </Button>
  );
};

export default NavigationBar;
export { Disconnect, SelectDevices };
