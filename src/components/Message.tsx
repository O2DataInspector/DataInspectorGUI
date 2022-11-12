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
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { RootModal } from "./RootPlot";
import ArrowTable from "./ArrowTable";

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
    <Box flex="0.8" maxWidth="75%">
      <Typography variant="h5">Header</Typography>
      <hr />
      <Header message={message} />
      <Typography variant="h5">Payload</Typography>
      <hr />
      <Payload message={message} />
    </Box>
  );
};

const Header = ({ message }: MessageProps) => {
  const displayProperty = (p: string | number | undefined) => {
    if (p === undefined || p === "") return "N/A";
    return p;
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Origin</TableCell>
            <TableCell>{displayProperty(message.origin)}</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>{displayProperty(message.description)}</TableCell>
            <TableCell>Sub-specification</TableCell>
            <TableCell>{displayProperty(message.subSpecification)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payload size</TableCell>
            <TableCell>{displayProperty(message.payloadSize)}</TableCell>
            <TableCell>Payload parts</TableCell>
            <TableCell>{displayProperty(message.payloadParts)}</TableCell>
            <TableCell>Payload split index</TableCell>
            <TableCell>{displayProperty(message.payloadSplitIndex)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Start time</TableCell>
            <TableCell>{displayProperty(message.startTime)}</TableCell>
            <TableCell>Creation time</TableCell>
            <TableCell>{displayProperty(message.creationTime)}</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>{displayProperty(message.duration)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Serialization</TableCell>
            <TableCell>
              {displayProperty(message.payloadSerialization)}
            </TableCell>
            <TableCell>FirstTForbit</TableCell>
            <TableCell>{displayProperty(message.firstTForbit)}</TableCell>
            <TableCell>Task&apos;s hash</TableCell>
            <TableCell>{displayProperty(message.taskHash)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

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
        {displayPayload(message)}
      </Box>
      <Box
        display={displayMethod === DisplayMethod.Raw ? "block" : "none"}
        width="100%"
        overflow="scroll"
      >
        <Typography
          sx={{
            display: "block",
            maxWidth: "100%",
            wordWrap: "break-word",
          }}
        >
          {message.binPayload}
        </Typography>
      </Box>
      <RootModal message={message} open={open} handleClose={handleClose} />
    </Stack>
  );
};

function displayPayload(message: Message) {
  switch (message.payloadSerialization) {
    case "ROOT":
      return <pre>{JSON.stringify(message.payload, null, "\t")}</pre>;
    case "ARROW":
      return <ArrowTable message={message} />;
    default:
      return (
        <Typography variant="body1">
          Unsupported payload serialization
        </Typography>
      );
  }
}

export { MessageHeader, MessageView };
