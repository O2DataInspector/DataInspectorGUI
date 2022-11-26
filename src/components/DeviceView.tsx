import React from "react";

import { Device } from "store/state";
import { Typography, Box } from "@mui/material";
import { Card, CardContent, CardActionArea } from "@mui/material";
import {useHistory, useParams} from "react-router-dom";

interface DeviceProps {
  device: Device;
}

interface RunIdParam {
  runId: string;
}

const DeviceView = ({ device }: DeviceProps) => {
  const history = useHistory();
  const params = useParams<RunIdParam>();

  function onClick() {
    history.push(`/runs/${params.runId}/overview/${device.name}`);
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
      <Typography variant="body1" color="text.secondary">
        <Box fontWeight='fontWeightMedium' display='inline'>messages</Box>: {device.ids.length}
      </Typography>
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
