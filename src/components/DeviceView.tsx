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

interface DeviceProps {
  device: Device;
}

const DeviceView = ({ device }: DeviceProps) => {
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
          <DeviceDetails device={device} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const DeviceDetails = ({ device }: DeviceProps) => {
  const specs = device.specs;
  return (
    <React.Fragment>
      <Typography variant="body2" color="text.secondary">
        rank: {specs.rank}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        nSlots: {specs.nSlots}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        inputTimesliceId: {specs.inputTimesliceId}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        maxInputTimeslices: {specs.maxInputTimeslices}
      </Typography>
    </React.Fragment>
  );
};

export default DeviceView;
