import React, {ChangeEvent, useEffect, useState} from "react";

import {
  Button,
  Box,
  Typography,
  Container,
  Paper,
  createTheme,
  ThemeProvider,
  Stack, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, Divider,
} from "@mui/material";
import {Run, Runs} from "../models/Runs";
import {useHistory} from "react-router-dom";
import Axios from "axios";
import {useSelector} from "react-redux";
import {selectAddress} from "../store/selectors";
import {setDevices} from "../store/actions";

interface Analysis {
  id: string,
  url: string,
  name: string,
  branch: string;
}

interface Analyses {
  analyses: Analysis[];
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
  const [analyses, setAnalyses] = useState<Analyses>({analyses: []});
  const [datasets, setDatasets] = useState<Datasets>({datasets: []});
  const [workflows, setWorkflows] = useState<Workflows>({workflows: []});

  const [selectedAnalysis, setSelectedAnalysis] = useState<string>("");
  const [selectedDataset, setSelectedDataset] = useState<string>("");
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>("");
  const [config, setConfig] = useState<string>("");

  useEffect(() => {
    Axios.get<Analyses>(`${address}/analyses`)
      .then((response) => {
        setAnalyses(response.data);
      })
      .catch((error) => {
        alert("Failed to retrieve analyses: " + error);
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
    if(selectedAnalysis.length == 0)
      return;

    Axios.get<Workflows>(`${address}/analyses/workflows`, {
      headers: {
        analysisId: selectedAnalysis
      }
    })
      .then((response) => {
        setWorkflows(response.data);
      })
      .catch((error) => {
        alert("Failed to retrieve workflows: " + error);
      });
  }, [selectedAnalysis]);

  const analysisChanged = (e: SelectChangeEvent) => {
    e.preventDefault();
    setSelectedAnalysis(e.target.value);
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
        analysisId: selectedAnalysis,
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
              <InputLabel>Analysis</InputLabel>
              <Select
                id="analysis-select"
                labelId="analysis-select"
                label="Analysis"
                onChange={analysisChanged}
              >
                {analyses.analyses.map((analysis) => <MenuItem key={analysis.id} value={analysis.id}>{analysis.name}</MenuItem>)}
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
              <InputLabel>Dataset</InputLabel>
              <Select
                id="dataset-select"
                labelId="dataset-select"
                label="Dataset"
                onChange={datasetChanged}
              >
                {datasets.datasets.map((dataset, i) => <MenuItem key={i} value={dataset}>{dataset}</MenuItem>)}
              </Select>
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
