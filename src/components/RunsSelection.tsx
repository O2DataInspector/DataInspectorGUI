import React, { useEffect, useState } from "react";

import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
  Stack,
  Divider,
} from "@mui/material";
import { Run, Runs } from "../models/Runs";
import Axios from "axios";
import { useSelector } from "react-redux";
import { selectAddress } from "../store/selectors";

interface RunsSelectionProps {
  onSelect: (runId: string, active: boolean) => void;
}

const RunsSelection = ({ onSelect }: RunsSelectionProps) => {
  const address = useSelector(selectAddress);
  const [runs, setRuns] = useState<Runs>({ runs: [] });

  const refresh = () => {
    Axios.get<Runs>(`${address}/runs`)
      .then((response) => {
        setRuns(response.data);
      })
      .catch((_) => {
        alert("Failed to retrieve active runs. Is proxy running?");
      });
  };

  useEffect(() => {
    refresh();
  }, []);

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
          <Typography variant="h3" sx={{ marginBottom: 7 }}>
            Runs
          </Typography>
          <Stack spacing={0} direction="column" justifyContent="center">
            {runs.runs.map((run) => (
              <SelectionOption key={run.id} run={run} onClick={onSelect} />
            ))}
          </Stack>
        </Box>
        <Stack direction="row" m="2em" alignItems="flex-start" spacing={1}>
          <Button
            variant="outlined"
            size="large"
            onClick={refresh}
            sx={{ flex: 1 }}
          >
            Refresh
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

interface SelectionOptionProps {
  run: Run;
  onClick: (runId: string, active: boolean) => void;
}

const SelectionOption = ({ run, onClick }: SelectionOptionProps) => {
  const _onClick = () => {
    onClick(run.id, run.status == "RUNNING");
  };

  const statusColor = (() => {
    if (run.status == "RUNNING") return "green";
    else return "red";
  })();

  const headerValue = (header: string, value: string) => (
    <Box sx={{ marginBottom: 1 }}>
      <Typography
        sx={{ fontSize: 14, marginBottom: 0 }}
        color="text.secondary"
        gutterBottom
      >
        {header}
      </Typography>
      <Typography variant="h5">{value}</Typography>
    </Box>
  );

  return (
    <Paper
      onClick={_onClick}
      sx={{ margin: 3, padding: 5, width: "100%", boxShadow: 5 }}
    >
      <div>
        <Typography variant="h3" sx={{ marginBottom: 1 }}>
          {run.id}
        </Typography>
        <Typography variant="h5" color={statusColor}>
          {run.status}
        </Typography>
        <Divider sx={{ margin: 2 }} />
        {headerValue("Build", run.build.name)}
        {headerValue("Workflow", run.workflow)}
        {run.config.length > 0 && headerValue("Config", run.config)}
      </div>
    </Paper>
  );
};

export default RunsSelection;
