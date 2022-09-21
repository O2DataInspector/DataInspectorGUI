import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import { MessageHeader, SimpleMessageView } from "components/Message";
import NavigationBar, * as Buttons from "components/NavigationBar";
import { setMessages } from "store/actions";
import { selectAddress, selectSelectedDevices } from "store/selectors";
import State, { Device, Message } from "store/state";
import RefreshIcon from "@mui/icons-material/Refresh";

import "components/common.css";
import "pages/dashboard.css";
import { Store } from "redux";
import { Container, Box } from "@mui/system";
import { Typography } from "@mui/material";

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
  <div id="dashboard-non-empty" className="flex-row">
    {devices.map((device) => (
      <DeviceView key={device.name} device={device} />
    ))}
  </div>
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
    <div className="row3">
      <MessageHeader device={device} />
      <button id="dashboard-device-view" onClick={onClick}>
        View
      </button>
    </div>
  );
};

const mapState = (state: State) => ({
  devices: state.devices.filter((device) => device.messages.length),
});

export default Redux.connect(mapState)(Dashboard);
