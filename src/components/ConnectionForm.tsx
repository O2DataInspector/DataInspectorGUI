import React from "react";
import {
  Container,
  Button,
  Paper,
  TextField,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";

interface ConnectionFormProps {
  onSubmit: (address: string) => void;
}

interface ConnectionFormState {
  hasError: boolean;
  port: number | undefined;
  host: string | undefined;
}

const ConnectionForm = ({ onSubmit }: ConnectionFormProps) => {
  const [state, setState] = React.useState<ConnectionFormState>({
    hasError: false,
    port: undefined,
    host: undefined,
  });

  const onSubmit_ = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page refresh
    if (state.host && state.port) {
      onSubmit("http://" + state.host + ":" + state.port);
    } else {
      setState((state) => ({ ...state, hasError: true }));
    }
  };

  const setPort = (maybePort: number | undefined) => {
    setState((state) => ({ ...state, hasError: false, port: maybePort }));
  };

  const setHost = (maybeHost: string | undefined) => {
    setState((state) => ({ ...state, hasError: false, host: maybeHost }));
  };

  return (
    <Paper
      component="form"
      onSubmit={onSubmit_}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        height: "50%",
      }}
    >
      <HostField onChange={setHost} />
      <PortField onChange={setPort} />
      <Button
        type="submit"
        variant="contained"
        sx={{ width: "50%", mx: "auto" }}
      >
        Connect
      </Button>
    </Paper>
  );
};

interface PortFieldProps {
  onChange: (port: number | undefined) => void;
}

const PortField = ({ onChange }: PortFieldProps) => {
  const [hasError, setHasError] = React.useState(false);

  const onChange_ = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);
    if (event.target.value) {
      if (value >= 0 && value <= 65535) {
        setHasError(false);
        onChange(value);
      } else {
        setHasError(true);
        onChange(undefined);
      }
    } else {
      setHasError(false);
      onChange(undefined);
    }
  };

  return (
    <TextField
      label="Port"
      error={hasError}
      onChange={onChange_}
      helperText={
        hasError ? "Should be a number from 0 to 65535" : "Analysis task's port"
      }
      variant="outlined"
      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      sx={{ width: "50%", mx: "auto" }}
    />
  );
};

interface HostFieldProps {
  onChange: (host: string | undefined) => void;
}

interface HostFieldState {
  hasError: boolean;
  isLocal: boolean;
  address: string | undefined;
}

const HostField = ({ onChange }: HostFieldProps) => {
  const localhost = "127.0.0.1";
  const IPregex = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

  const [state, setState] = React.useState<HostFieldState>({
    hasError: false,
    isLocal: true,
    address: localhost,
  });

  const onRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.value) {
      case "local": {
        setState((state) => ({ ...state, hasError: false, isLocal: true }));
        onChange(localhost);
        break;
      }
      case "remote": {
        const hasNoError =
          state.address === undefined || IPregex.test(state.address);
        setState((state) => ({
          ...state,
          hasError: !hasNoError,
          isLocal: false,
        }));
        onChange(hasNoError ? state.address : undefined);
        break;
      }
    }
  };

  const onAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value || undefined;
    const hasNoError = value === undefined || IPregex.test(value);
    setState((state) => ({
      ...state,
      hasError: !hasNoError,
      address: value,
    }));
    onChange(hasNoError ? value : undefined);
  };

  return (
    <Container sx={{ width: "75%" }}>
      <FormControl>
        <FormLabel>Connection Type</FormLabel>
        <RadioGroup onChange={onRadioChange}>
          <FormControlLabel value="local" control={<Radio />} label="Local" />
          <FormControlLabel value="remote" control={<Radio />} label="Remote" />
        </RadioGroup>
      </FormControl>
      <br />
      {state.isLocal ? null : (
        <TextField
          label="Host address"
          error={state.hasError}
          onChange={onAddressChange}
          helperText={state.hasError ? "Should be IPv4 address" : ""}
          variant="outlined"
          sx={{ width: "75%", ml: "12.5%" }}
        />
      )}
    </Container>
  );
};

export default ConnectionForm;
