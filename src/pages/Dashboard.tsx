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
import { Typography, Grid } from "@mui/material";
import { Card, CardContent, CardActionArea } from "@mui/material";

interface DashboardProps {
  devices: Device[];
}

const Dashboard = ({ devices }: DashboardProps) => {
  const store = Redux.useStore() as Store<State>;

  function onRefresh() {
    const address = selectAddress(store.getState());
    const selectedDevices = selectSelectedDevices(store.getState());
    Axios.get(address + "/inspected-data", {
      headers: {
        devices: selectedDevices.map((device) => device.name).join(","),
        count: "5",
      },
    })
      .then((data) => {
        if (data.data) {
          console.log(data.data);
          store.dispatch(setMessages(data.data as Message[]));
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

interface DeviceViewProps {
  device: Device;
}

const DeviceView = ({ device }: DeviceViewProps) => {
  const message = device.messages.find((message) => message.isDisplayed);
  const history = Router.useHistory();

  function onClick() {
    history.push(`/overview/${device.name}`);
  }

  if (message === undefined) {
    return null;
  }
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {device.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Device details placeholder
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const mapState = (state: State) => ({
  devices: state.devices.filter((device) => device.messages.length),
});

export default Redux.connect(mapState)(Dashboard);
