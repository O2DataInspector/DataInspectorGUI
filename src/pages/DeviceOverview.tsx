import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";

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
import { updateDeviceMessage } from "store/actions";
import State, { Device, Message } from "store/state";
import { selectAddress, selectIsRunActive } from "store/selectors";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

interface DeviceOverviewProps {
  maybeDevice: Device | undefined;
}

interface RunIdParam {
  runId: string;
}

const DeviceOverview = ({ maybeDevice }: DeviceOverviewProps) => {
  const isRunActive = useSelector(selectIsRunActive);
  const history = Router.useHistory();
  const params = useParams<RunIdParam>();

  function onExit() {
    history.push(`/runs/${params.runId}/dashboard`);
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices runId={params.runId} />
        {isRunActive && <Buttons.StopRun runId={params.runId} />}
        <Buttons.SelectRun />
      </NavigationBar>
      {maybeDevice ? <NonEmptyDevice device={maybeDevice} /> : <EmptyDevice />}
      <ExitToAppIcon
        onClick={onExit}
        sx={{ fontSize: "5em", position: "absolute", top: "8%", right: "1%" }}
      />
    </Box>
  );
};

interface DeviceProps {
  device: Device;
}

const NonEmptyDevice = ({ device }: DeviceProps) => {
  const store = Redux.useStore() as Store<State>;

  function onClick(messageId: string) {
    const newMessage = device.messages[messageId];
    if (newMessage === undefined) {
      const address = selectAddress(store.getState());
      Axios.get(address + "/messages", {
        headers: {
          id: messageId,
        },
      })
        .then((response) => {
          store.dispatch(
            updateDeviceMessage(
              device.name,
              response.data as Message,
              messageId
            )
          );
        })
        .catch((error) => {
          alert("Failed to download the message: " + error);
        });
    } else {
      store.dispatch(updateDeviceMessage(device.name, newMessage, messageId));
    }
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
              {device.ids.map((id) => (
                <SelectionOption id={id} key={id} onClick={onClick} />
              ))}
            </List>
          </Box>
          <hr style={{ flex: 0, marginLeft: "1em", marginRight: "2em" }} />
          {device.displayedMessage ? (
            <MessageView message={device.displayedMessage} />
          ) : (
            <EmptyMessage />
          )}
        </Container>
      </Paper>
    </Container>
  );
};

interface SelectionOptionProps {
  id: string;
  onClick: (arg: string) => void;
}

const SelectionOption = ({ id, onClick }: SelectionOptionProps) => (
  <React.Fragment>
    <ListItem onClick={() => onClick(id)} disablePadding>
      <ListItemButton>
        <ListItemText primary={id} />
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

export default Redux.connect(mapState)(DeviceOverview);
