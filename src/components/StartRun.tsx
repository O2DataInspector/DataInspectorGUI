import React, {ChangeEvent, useEffect, useState} from "react";

import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
  Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, Divider, FormControlLabel, Checkbox,
} from "@mui/material";
import {Run, Runs} from "../models/Runs";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {useSelector} from "react-redux";
import {selectAddress} from "../store/selectors";
import {setDevices} from "../store/actions";

interface Build {
  id: string,
  url: string,
  name: string,
  branch: string;
}

interface Builds {
  builds: Build[];
}

interface Datasets {
  datasets: string[];
}

interface Workflows {
  workflows: string[];
}

interface RunIdResponse {
  runId: string;
}

const StartRun = () => {
  const history = useHistory();
  const address = useSelector(selectAddress);
  const [builds, setBuilds] = useState<Builds>({builds: []});
  const [datasets, setDatasets] = useState<Datasets>({datasets: []});
  const [workflows, setWorkflows] = useState<Workflows>({workflows: []});

  const [selectedBuild, setSelectedBuild] = useState<string>("");
  const [includeDataset, setIncludeDataset] = useState<boolean>(false);
  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("");
  const [config, setConfig] = useState<string>("");

  useEffect(() => {
    Axios.get<Builds>(`${address}/builds`)
      .then((response) => {
        setBuilds(response.data);
      })
      .catch((error) => {
        alert("Failed to retrieve builds: " + error);
      });

    Axios.get<Datasets>(`${address}/runs/datasets`)
      .then((response) => {
        setDatasets(response.data);
      })
      .catch((error) => {
        alert("Failed to retrieve datasets: " + error);
      });
  }, []);

  useEffect(() => {
    if(selectedBuild.length == 0)
      return;

    Axios.get<Workflows>(`${address}/builds/workflows`, {
      headers: {
        buildId: selectedBuild
      }
    })
      .then((response) => {
        setWorkflows(response.data);
      })
      .catch((error) => {
        alert("Failed to retrieve workflows: " + error);
      });
  }, [selectedBuild]);

  const buildChanged = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectedBuild(e.target.value);
  }

  const workflowChanged = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectedWorkflow(e.target.value);
  }

  const datasetChanged = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectedDataset(e.target.value);
  }

  const configChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setConfig(e.target.value);
  }

  const createRun = () => {
    Axios.post<RunIdResponse>(`${address}/runs`, null, {
      headers: {
        buildId: selectedBuild,
        dataset: selectedDataset,
        config: config,
        workflow: selectedWorkflow
      }
    })
      .then((response) => {
        const runId = response.data.runId
        alert(`Wait for run(${runId}) to have status RUNNING`);
      })
      .catch((error) => {
        alert("Failed to run: " + error);
      });
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
          <Typography variant="h3">New run</Typography>
          <FormControl fullWidth>
            <Box>
              <InputLabel>Build</InputLabel>
              <Select
                id="build-select"
                labelId="build-select"
                label="Build"
                onChange={buildChanged}
              >
                {builds.builds.map((build) => <MenuItem key={build.id} value={build.id}>{build.name}</MenuItem>)}
              </Select>
            </Box>
            {workflows.workflows.length > 0 && (
              <Box>
                <InputLabel>Workflow</InputLabel>
                <Select
                  id={"workflow-select"}
                  labelId="workflow-select"
                  label="Workflow"
                  onChange={workflowChanged}
                >
                  {workflows.workflows.map((workflow, i) => <MenuItem key={i} value={workflow}>{workflow}</MenuItem>)}
                </Select>
              </Box>
            )}
            <Box>
              <FormControlLabel
                control={
                  <Checkbox onChange={() => setIncludeDataset(!includeDataset)} checked={includeDataset} />
                }
                label={"Include Dataset"}
              />
            </Box>
            {includeDataset && (
              <Box>
                <InputLabel>Dataset</InputLabel>
                <Select
                  id="dataset-select"
                  labelId="dataset-select"
                  label="Dataset"
                  onChange={datasetChanged}
                >
                  {datasets.datasets.map((dataset, i) => <MenuItem key={i} value={dataset}>{dataset}</MenuItem>)}
                </Select>
              </Box>
            )}
            <Box>
              <TextField label="Config" variant="outlined" onChange={configChanged}/>
              <Button onClick={createRun}>Run</Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
};

export default StartRun;
