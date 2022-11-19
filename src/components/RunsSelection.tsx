import React, {useEffect, useState} from "react";

import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
  Stack,
} from "@mui/material";
import {Run, Runs} from "../models/Runs";
import Axios from "axios";
import {useSelector} from "react-redux";
import {selectAddress} from "../store/selectors";

interface RunsSelectionProps {
  onSelect: (runId: string) => void;
}

const RunsSelection = ({ onSelect }: RunsSelectionProps) => {
  const address = useSelector(selectAddress);
  const [runs, setRuns] = useState<Runs>({runs: []});

  const refresh = () => {
    Axios.get<Runs>(`${address}/runs`)
      .then((response) => {
        setRuns(response.data);
      })
      .catch((_) => {
        alert("Failed to retrieve active runs. Is proxy running?");
      });
  }

  useEffect(() => {
    refresh();
  }, []);

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
          <Typography variant="h3">Runs</Typography>
          <Stack>
            {runs.runs.map((run) => (
              <SelectionOption
                key={run.id}
                run={run}
                onClick={onSelect}
              />
            ))}
          </Stack>
        </Box>
        <ThemeProvider theme={theme}>
          <Stack direction="row" m="2em" alignItems="flex-start" spacing={1}>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={refresh}
              sx={{ flex: 1 }}
            >
              Refresh
            </Button>
          </Stack>
        </ThemeProvider>
      </Paper>
    </Container>
  );
};

interface SelectionOptionProps {
  run: Run;
  onClick: (runId: string) => void;
}

const SelectionOption = ({ run, onClick }: SelectionOptionProps) => {
  const _onClick = () => {
    if(run.status == "RUNNING")
      onClick(run.id);
    else
      alert("Run has already finished or has not yet started");
  }

  return (
    <Paper onClick={_onClick}>
      <div>
        <Typography variant="h3">Run {run.id}</Typography>
        <Typography variant="h5">Status {run.status}</Typography>
        <Typography variant="h5">Build {run.build.name}</Typography>
        <Typography variant="h5">Workflow {run.workflow}</Typography>
        <Typography variant="h5">Config {run.config}</Typography>
      </div>
    </Paper>
  )
};

export default RunsSelection;
