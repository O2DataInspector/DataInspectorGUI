import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";

import State, { Device } from "store/state";
import {setInspection} from "store/actions";
import {selectAddress, selectIsRunActive} from "store/selectors";

import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  createTheme,
  ThemeProvider,
  Stack,
  Divider,
} from "@mui/material";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

interface DeviceOption {
  name: string,
  isSelected: boolean
}

interface DevicesSelectionProps {
  devices: DeviceOption[];
}

interface RunIdParam {
  runId: string;
}

const DevicesSelection = ({ devices }: DevicesSelectionProps) => {
  const isRunActive = useSelector(selectIsRunActive);
  const [state, setState] = React.useState(devices);
  const params = useParams<RunIdParam>();
  const store = Redux.useStore() as Store<State>;
  const address = useSelector(selectAddress);
  const history = Router.useHistory();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ef5350",
      },
      secondary: {
        main: "#9ccc65",
      },
    },
  });

  function onClick(deviceName: string) {
    setState(
      state.map((other) =>
        other.name === deviceName ? { ...other, isSelected: !other.isSelected } : other
      )
    );
  }

  function selectAll() {
    setState(state.map((device) => ({ ...device, isSelected: true })));
  }

  function deselectAll() {
    setState(state.map((device) => ({ ...device, isSelected: false })));
  }

  function onSave() {
    if(isRunActive) {
      Axios.get(address + "/select-devices", {
        headers: {
          runId: params.runId,
          devices: state
            .filter((device) => device.isSelected)
            .map((d) => d.name)
            .join(","),
        },
      })
        .then((_) => {
          store.dispatch(setInspection(state.filter((d) => d.isSelected).map((d) => d.name)));
          history.push(`/runs/${params.runId}/dashboard`);
        })
        .catch((error) => {
          alert("Failed to refresh the messages: " + error);
          store.dispatch(setInspection(state.filter((d) => d.isSelected).map((d) => d.name)));
          history.goBack();
        });
    } else {
      store.dispatch(setInspection(state.filter((d) => d.isSelected).map((d) => d.name)));
      history.push(`/runs/${params.runId}/dashboard`);
    }
  }

  function onCancel() {
    history.goBack();
  }

  return (
    <Container sx={{ my: "2.5%", maxWidth: "50%" }}>
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box m="2em">
          <Typography variant="h3">Inspected devices</Typography>
          <Stack
            m="1em"
            direction="row"
            justifyContent="space-evenly"
            spacing={2}
          >
            <Button variant="outlined" onClick={selectAll} sx={{ flex: 1 }}>
              Select all
            </Button>
            <Button variant="outlined" onClick={deselectAll} sx={{ flex: 1 }}>
              Deselect all
            </Button>
          </Stack>
          <FormGroup>
            {state.map((device) => (
              <SelectionOption
                key={device.name}
                device={device}
                onClick={onClick}
              />
            ))}
          </FormGroup>
        </Box>
        <ThemeProvider theme={theme}>
          <Stack direction="row" m="2em" alignItems="flex-start" spacing={1}>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onSave}
              sx={{ flex: 1 }}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={onCancel}
              sx={{ flex: 1 }}
            >
              Cancel
            </Button>
          </Stack>
        </ThemeProvider>
      </Paper>
    </Container>
  );
};

interface SelectionOptionProps {
  device: DeviceOption;
  onClick: (deviceName: string) => void;
}

const SelectionOption = ({ device, onClick }: SelectionOptionProps) => (
  <FormControlLabel
    control={
      <Checkbox onChange={() => onClick(device.name)} checked={device.isSelected} />
    }
    label={device.name}
  />
);

const mapState = (state: State) => {
  function onlyUnique(value: string, index: number, self: string[]) {
    return self.indexOf(value) === index;
  }

  const names = state.devices.map((d) => d.name);
  const uniqueNames = names.filter(onlyUnique);

  return {devices: uniqueNames.map((name) => {
      return {
        name: name,
        isSelected: state.devices.filter((d) => d.name === name).map((d) => d.isSelected)[0]
      }
    })};
};

export default Redux.connect(mapState)(DevicesSelection);
