import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";

import NavigationBar, * as Buttons from "components/NavigationBar";
import DeviceView from "components/DeviceView";
import { setMessages } from "store/actions";
import { selectAddress, selectSelectedDevices } from "store/selectors";
import State, { Device, Message } from "store/state";
import RefreshIcon from "@mui/icons-material/Refresh";

import { Store } from "redux";
import { Container, Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import MenuTabs from "components/MenuTabs";

interface DashboardProps {
  devices: Device[];
}

interface InspectedDataResponse {
  messages: Message[];
}

const Dashboard = ({ devices }: DashboardProps) => {
  const store = Redux.useStore() as Store<State>;

  function onRefresh() {
    const address = selectAddress(store.getState());
    const selectedDevices = selectSelectedDevices(store.getState());
    Axios.get<InspectedDataResponse>(address + "/inspected-data", {
      headers: {
        devices: selectedDevices.map((device) => device.name).join(","),
        count: "5",
      },
    })
      .then((response) => {
        if (response.data.messages) {
          console.log(response.data.messages);
          store.dispatch(setMessages(response.data.messages));
        }
      })
      .catch((error) => {
        alert("Failed to refresh the messages: " + error);
      });
  }

  return (
    <React.Fragment>
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      <Container sx={{ height: "50%" }}>
      <MenuTabs />
        {devices.length ? (
          <NonEmptyDashboard devices={devices} />
        ) : (
          <EmptyDashboard />
        )}
        <RefreshIcon
          onClick={onRefresh}
          sx={{ fontSize: "5em", position: "absolute", top: "8%", right: "1%" }}
        />
      </Container>
    </React.Fragment>
  );
};

const EmptyDashboard = () => (
  <Box mt="20%">
    <Typography align="center" variant="h2">
      No devices to display
    </Typography>
    <Typography align="center" variant="h6" component="h3">
      Refresh or select different devices to inspect
    </Typography>
  </Box>
);

const NonEmptyDashboard = ({ devices }: DashboardProps) => (
  <Grid
    container
    spacing={{ xs: 2, md: 3 }}
    columns={{ xs: 4, sm: 8, md: 12 }}
    pt="5%"
  >
    {devices.map((d) => (
      <Grid item xs={2} sm={4} md={4} key={d.name}>
        <DeviceView device={d} />
      </Grid>
    ))}
  </Grid>
);

const mapState = (state: State) => ({
  devices: state.devices.filter((device) => device.messages.length),
});

export default Redux.connect(mapState)(Dashboard);
