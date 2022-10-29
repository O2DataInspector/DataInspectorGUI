import React from "react";
import { parse, redraw, cleanup, resize } from "jsroot";

import DeviceIcon from "icons/device.svg";
import { Device, DisplayMethod, Message } from "store/state";
import {
  Box,
  Typography,
  Toolbar,
  ButtonGroup,
  Stack,
  Button,
} from "@mui/material";
import { RootModal } from "./RootPlot";

interface MessageHeaderProps {
  device: Device;
}

const MessageHeader = ({ device }: MessageHeaderProps) => (
  <Toolbar sx={{ backgroundColor: "#e0e0e0", flex: 0.1 }}>
    <Box display="flex" width="100%">
      <img src={DeviceIcon} alt="DeviceIcon" width="5%" />
      <Typography variant="h5" width="50%" sx={{ ml: "0.5em", my: "auto" }}>
        {device.name}
      </Typography>
    </Box>
  </Toolbar>
);

interface MessageProps {
  message: Message;
}

const MessageView = ({ message }: MessageProps) => {
  return (
    <Box flex="0.8">
      <Typography variant="h5">Header</Typography>
      <hr />
      <Header message={message} />
      <Typography variant="h5">Payload</Typography>
      <hr />
      <Payload message={message} />
    </Box>
  );
};

const Header = ({ message }: MessageProps) => (
  <div>
    <table>
      <tr>
        <td>Origin: {message.origin}</td>
        <td>Payload parts: {message.payloadParts}</td>
      </tr>
      <tr>
        <td>Description: {message.description}</td>
        <td>Payload split index: {message.payloadSplitIndex}</td>
      </tr>
      <tr>
        <td>Sub-specification: {message.subSpecification}</td>
        <td>Start time: {message.startTime ? message.startTime : "N/A"}</td>
      </tr>
      <tr>
        <td>Payload size: {message.payloadSize} B</td>
        <td>Duration: {message.duration ? message.duration : "N/A"}</td>
      </tr>
      <tr>
        <td>Serialization: {message.payloadSerialization}</td>
        <td>
          Creation time: {message.creationTime ? message.creationTime : "N/A"}
        </td>
      </tr>
      <tr>
        <td>FirstTForbit: {message.firstTForbit}</td>
        <td>Task&apos;s hash: {message.taskHash ? message.taskHash : "N/A"}</td>
      </tr>
      <tr>
        <td>Run numer: {message.runNumber}</td>
        <td></td>
      </tr>
    </table>
  </div>
);

const Payload = ({ message }: MessageProps) => {
  const [displayMethod, setDisplayMethod] = React.useState(
    DisplayMethod.Default
  );
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    const obj = parse(JSON.stringify(message.payload));
    console.log(document.getElementById("root-plot"));
    try {
      redraw("root-plot", obj, "colz");
      resize("root-plot");
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    cleanup("root-plot");
    setOpen(false);
  };

  return message.payload === undefined || message.payload === null ? (
    <span>Empty payload</span>
  ) : (
    <Stack height="50%" spacing={4}>
      <ButtonGroup color="inherit" fullWidth>
        <Button onClick={() => setDisplayMethod(DisplayMethod.Default)}>
          Default ({message.payloadSerialization})
        </Button>
        <Button onClick={() => setDisplayMethod(DisplayMethod.Raw)}>Raw</Button>
        {message.payloadSerialization === "ROOT" && (
          <Button variant="outlined" onClick={handleOpen}>
            Plot
          </Button>
        )}
      </ButtonGroup>
      <Box
        overflow="scroll"
        display={displayMethod === DisplayMethod.Default ? "block" : "none"}
      >
        <pre>{JSON.stringify(message.payload, null, "\t")}</pre>
      </Box>
      <Box display={displayMethod === DisplayMethod.Raw ? "block" : "none"}>
        RAW
      </Box>
      <RootModal message={message} open={open} handleClose={handleClose} />
    </Stack>
  );
};

export { MessageHeader, MessageView };
