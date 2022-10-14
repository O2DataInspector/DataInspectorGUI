import React from "react";
import { parse, draw, cleanup, resize } from "jsroot";

import DeviceIcon from "icons/device.svg";
import { Device, DisplayMethod, Message } from "store/state";
import {
  Box,
  Typography,
  Toolbar,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";

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

interface DisplaySelectionProps {
  message: Message;
  displayMethod: DisplayMethod;
  setDisplayMethod: React.Dispatch<React.SetStateAction<DisplayMethod>>;
}

const DisplaySelection = ({
  message,
  displayMethod,
  setDisplayMethod,
}: DisplaySelectionProps) => {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    if (displayMethod === DisplayMethod.Plot) {
      cleanup("message-payload");
    }

    let newDisplayMethod = DisplayMethod.Default;
    switch (newValue) {
      case "raw":
        newDisplayMethod = DisplayMethod.Raw;
        break;
      case "plot":
        newDisplayMethod = DisplayMethod.Plot;
        break;
    }
    setDisplayMethod(newDisplayMethod);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={displayMethod}
      exclusive
      onChange={handleChange}
      aria-label="Display Method"
      fullWidth
    >
      <ToggleButton value="default">
        Default ({message.payloadSerialization})
      </ToggleButton>
      <ToggleButton value="raw">Raw</ToggleButton>
      {message.payloadSerialization === "ROOT" ? (
        <ToggleButton value="plot">Plot</ToggleButton>
      ) : null}
    </ToggleButtonGroup>
  );
};

interface PayloadProps {
  message: Message;
  displayMethod: DisplayMethod;
  setDisplayMethod: React.Dispatch<React.SetStateAction<DisplayMethod>>;
}

const Payload = ({ message }: MessageProps) => {
  const [displayMethod, setDisplayMethod] = React.useState(DisplayMethod.Plot);
  React.useEffect(() => {
    const obj = parse(JSON.stringify(message.payload));
    draw("message-payload", obj, "colz");
    resize("message-payload");
    console.log("xD");
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    let newDisplayMethod = DisplayMethod.Default;
    switch (newValue) {
      case "raw":
        newDisplayMethod = DisplayMethod.Raw;
        break;
      case "plot":
        newDisplayMethod = DisplayMethod.Plot;
        break;
    }
    setDisplayMethod(newDisplayMethod);
  };

  return message.payload === undefined || message.payload === null ? (
    <span>Empty payload</span>
  ) : (
    <Stack height="50%" spacing={4}>
      <ToggleButtonGroup
        color="primary"
        value={displayMethod}
        exclusive
        onChange={handleChange}
        aria-label="Display Method"
        fullWidth
      >
        <ToggleButton value="default">
          Default ({message.payloadSerialization})
        </ToggleButton>
        <ToggleButton value="raw">Raw</ToggleButton>
        {message.payloadSerialization === "ROOT" ? (
          <ToggleButton value="plot">Plot</ToggleButton>
        ) : null}
      </ToggleButtonGroup>
      <Box
        maxWidth="75%"
        overflow="scroll"
        display={displayMethod === DisplayMethod.Default ? "block" : "none"}
      >
        {JSON.stringify(message.payload)}
      </Box>
      <Box display={displayMethod === DisplayMethod.Raw ? "block" : "none"}>
        RAW
      </Box>
      <Box
        height="50%"
        width="auto"
        id="message-payload"
        display={displayMethod === DisplayMethod.Plot ? "block" : "none"}
        sx={{ flex: 1 }}
      >
        Message type does not support plotting.
      </Box>
    </Stack>
  );
};

function displayPayload(m: Message, displayMethod: DisplayMethod) {
  switch (displayMethod) {
    case DisplayMethod.Plot:
      return plotPayload(m);
    default:
      return <span>{m.payload?.toString()}</span>;
  }
}

function plotPayload(m: Message): JSX.Element {
  const obj = parse(JSON.stringify(m.payload));
  draw("message-payload", obj, "colz");
  return <div>Message type does not support drawing.</div>;
}

export { MessageHeader, MessageView };
