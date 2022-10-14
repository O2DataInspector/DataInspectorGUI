import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import { MessageHeader, MessageView } from "components/Message";
import NavigationBar, * as Buttons from "components/NavigationBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { setDisplayed } from "store/actions";
import State, { Device, Message } from "store/state";

interface OverviewProps {
  maybeDevice: Device | undefined;
}

const Overview = ({ maybeDevice }: OverviewProps) => {
  const history = Router.useHistory();

  function onExit() {
    history.push("/dashboard");
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      {maybeDevice ? <NonEmptyDevice device={maybeDevice} /> : <EmptyDevice />}
      <ExitToAppIcon
        onClick={onExit}
        sx={{ fontSize: "5em", position: "absolute", top: "8%", right: "1%" }}
      />
    </Box>
  );
};

interface OverviewDeviceProps {
  device: Device;
}

const NonEmptyDevice = ({ device }: OverviewDeviceProps) => {
  const store = Redux.useStore();

  const message = device.messages.find((message) => message.isDisplayed);

  function onClick(message: Message) {
    store.dispatch(setDisplayed(message));
  }
  //TODO: Virtualize message selection list
  return (
    <Container sx={{ my: "2.5%", flex: 1, maxHeight: "80%" }}>
      <Paper sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <MessageHeader device={device} />
        <Container
          sx={{
            flex: 0.9,
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            my: "2.5%",
            maxHeight: "80%",
          }}
        >
          <Box flex="0.2" maxHeight="90%">
            <Typography align="center" variant="h5">
              Select message:
            </Typography>
            <List sx={{ my: "1em", maxHeight: "90%", overflow: "scroll" }}>
              {device.messages.map((message) => (
                <SelectionOption
                  key={message.id}
                  message={message}
                  onClick={onClick}
                />
              ))}
            </List>
          </Box>
          <hr style={{ flex: 0, marginLeft: "1em", marginRight: "2em" }} />
          {message ? <MessageView message={message} /> : <EmptyMessage />}
        </Container>
      </Paper>
    </Container>
  );
};

interface SelectionOptionProps {
  message: Message;
  onClick: (message: Message) => void;
}

const SelectionOption = ({ message, onClick }: SelectionOptionProps) => (
  <React.Fragment>
    <ListItem onClick={() => onClick(message)} disablePadding>
      <ListItemButton>
        <ListItemText
          primary={message.id}
          secondary={message.payloadSerialization}
        />
      </ListItemButton>
    </ListItem>
    <Divider />
  </React.Fragment>
);

const EmptyDevice = () => (
  <Box mt="10%">
    <Typography align="center" variant="h2">
      Device does not exist
    </Typography>
    <Typography align="center" variant="h6" component="h3">
      Please select different device to inspect
    </Typography>
  </Box>
);

const EmptyMessage = () => <div />;

interface DeviceNameProps {
  name: string;
}

const mapState = (
  state: State,
  { match }: Router.RouteComponentProps<DeviceNameProps>
) => ({
  maybeDevice: state.devices.find(
    (device) => device.name === match.params.name
  ),
});

export default Redux.connect(mapState)(Overview);
