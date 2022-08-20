import React from "react";
import { ValidInvalid } from "components/common";
import "./connection-form.css";

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
    <form id="connection-form" onSubmit={onSubmit_}>
      <div className="row3">
        <PortField key="port" onChange={setPort} />
        <HostField onChange={setHost} />
        <ConnectionButton hasError={state.hasError} />
      </div>
    </form>
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
    <div id="port-field">
      <label>Enter analysis task`&apos;`s port:</label>
      <ValidInvalid isValid={!hasError}>
        <input type="text" placeholder="Port" onChange={onChange_} />
      </ValidInvalid>
      {hasError ? <span>Should be a number from 0 to 65535</span> : <br />}
    </div>
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

  const onChange_ = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
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
      case "address": {
        const value = event.currentTarget.value || undefined;
        const hasNoError = value === undefined || IPregex.test(value);
        setState((state) => ({
          ...state,
          hasError: !hasNoError,
          address: value,
        }));
        onChange(hasNoError ? value : undefined);
      }
    }
  };

  return (
    <div id="host-field">
      <label>Choose connection type:</label>
      <RadioButton
        name="local"
        label="Local connection"
        onChange={onChange_}
        checked={state.isLocal}
      />
      <RadioButton
        name="remote"
        label="Remote connection"
        onChange={onChange_}
        checked={!state.isLocal}
      />
      <ValidInvalid isValid={!state.hasError}>
        <input
          type="text"
          name="address"
          placeholder="IPv4 address"
          onChange={onChange_}
          disabled={state.isLocal}
        />
      </ValidInvalid>
      {state.hasError ? <span>Should be a valid IPv4 address</span> : <br />}
    </div>
  );
};

interface ConnectionButtonProps {
  hasError: boolean;
}

const ConnectionButton = ({ hasError }: ConnectionButtonProps) => (
  <div id="connection-button">
    {hasError ? <span>Improper values</span> : <br />}
    <input type="submit" value="Connect" />
  </div>
);

interface RadioButtonProps {
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const RadioButton = ({ name, label, onChange, checked }: RadioButtonProps) => (
  <label>
    <input type="radio" name={name} onChange={onChange} checked={checked} />
    {label}
  </label>
);

export default ConnectionForm;
