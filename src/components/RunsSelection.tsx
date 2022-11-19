import React from "react";

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
import {useHistory} from "react-router-dom";

interface RunsSelectionProps {
  runs: Runs,
  onSelect: (runId: string) => void;
}

const RunsSelection = ({ runs, onSelect }: RunsSelectionProps) => {
  const history = useHistory();

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
          <Typography variant="h3">Active runs</Typography>
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
  run: Run;
  onClick: (runId: string) => void;
}

const SelectionOption = ({ run, onClick }: SelectionOptionProps) => (
  <Paper onClick={() => onClick(run.id)}>
    <div>
      <Typography variant="h3">Run {run.id}</Typography>
      <Typography variant="h5">Analysis {run.analysis.name}</Typography>
      <Typography variant="h5">Workflow {run.workflow}</Typography>
      <Typography variant="h5">Config {run.config}</Typography>
    </div>
  </Paper>
);

export default RunsSelection;
