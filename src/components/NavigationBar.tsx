import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";

import LogoIcon from "icons/logo.svg";
import { cleanRunData, disconnect } from "store/actions";
import { selectAddress } from "store/selectors";
import State from "store/state";
import { useSelector, useStore } from "react-redux";

type ContainerProps = {
  children: React.ReactNode;
};

const NavigationBar = (props: ContainerProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
    },
  });

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <ThemeProvider theme={theme}>
          <Box
            sx={{ flexGrow: 1, display: "flex", flexDirection: "row-reverse" }}
          >
            {props.children}
          </Box>
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
    store.dispatch(disconnect());
    history.push("/");
  }

  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      Disconnect
    </Button>
  );
};

const SelectRun = () => {
  const store = Redux.useStore() as Store<State>;
  const history = Router.useHistory();

  function onClick() {
    store.dispatch(cleanRunData());
    history.push("/runs");
  }

  return (
    <Button variant="outlined" color="primary" onClick={onClick}>
      Select run
    </Button>
  );
};

interface SelectDevicesProps {
  runId: string;
}

const SelectDevices = ({ runId }: SelectDevicesProps) => {
  const history = Router.useHistory();

  function onClick() {
    history.push(`/runs/${runId}/selection`);
  }

  return (
    <Button variant="outlined" onClick={onClick} sx={{ mx: "1em" }}>
      Select Devices
    </Button>
  );
};

interface StopRunProps {
  runId: string;
}

const StopRun = ({ runId }: StopRunProps) => {
  const history = Router.useHistory();
  const store = useStore();
  const address = useSelector(selectAddress);

  function onClick() {
    Axios.post<object>(`${address}/runs/stop`, null, {
      headers: {
        runId: runId,
      },
    })
      .then((result) => {
        alert("Workflow stopped");
        store.dispatch(cleanRunData());
        history.push(`/runs`);
      })
      .catch((reason) => {
        alert("Failed to stop running workflow.");
      });
  }

  return (
    <Button variant="outlined" onClick={onClick} sx={{ mx: "1em" }}>
      Stop run
    </Button>
  );
};

export default NavigationBar;
export { Disconnect, SelectDevices, StopRun, SelectRun };
