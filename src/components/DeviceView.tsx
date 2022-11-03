import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import { Device } from "store/state";
import { Typography } from "@mui/material";
import { Card, CardContent, CardActionArea } from "@mui/material";

interface DeviceProps {
  device: Device;
}

const DeviceView = ({ device }: DeviceProps) => {
  const history = Router.useHistory();

  function onClick() {
    history.push(`/overview/${device.name}`);
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
