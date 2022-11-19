import React from "react";
import * as Redux from "react-redux";

import NavigationBar, * as Buttons from "components/NavigationBar";
import DeviceView from "components/DeviceView";
import State, { Device, Message } from "store/state";

import { Store } from "redux";
import { Container, Box } from "@mui/system";
import { Typography, Grid } from "@mui/material";
import MenuTabs from "components/MenuTabs";
import UpdateButtons from "components/UpdateButtons";
import {useParams} from "react-router-dom";

interface DashboardProps {
  devices: Device[];
}

interface RunIdParam {
  runId: string;
}

const Dashboard = ({ devices }: DashboardProps) => {
  const store = Redux.useStore() as Store<State>;
  const params = useParams<RunIdParam>();

  return (
    <React.Fragment>
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices runId={params.runId} />
      </NavigationBar>
      <Container sx={{ height: "50%" }}>
        <MenuTabs runId={params.runId} />
        {devices.length ? (
          <NonEmptyDashboard devices={devices} />
        ) : (
          <EmptyDashboard />
        )}
        <UpdateButtons runId={params.runId} />
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
  devices: state.devices.filter((d) => d.isSelected),
});

export default Redux.connect(mapState)(Dashboard);
