import React from "react";

import { Message } from "store/state";
import {
  Grid,
  TextField,
  Paper,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Stack,
  Typography,
  Button,
  ButtonGroup,
} from "@mui/material";
import { StatisticsResponse } from "pages/StatisticsOverview";

interface StatisticsQuery {
  device?: string;
  origin?: string;
  description?: string;
  subSpecification?: number;
  firstTForbit?: number;
  tfCounter?: number;
  runNumber?: number;
  taskHash?: string;
  payloadSerialization?: string;
  payloadParts?: number;
  payloadSplitIndex?: number;
  minStartTime?: number;
  maxStartTime?: number;
  minCreationTime?: number;
  maxCreationTime?: number;
  minDuration?: number;
  maxDuration?: number;
  minPayloadSize?: number;
  maxPayloadSize?: number;
  count?: number;
  [key: string]: string | number | undefined;
}

interface StatisticsFormProps {
  response: StatisticsResponse | undefined;
  setResponse: React.Dispatch<
    React.SetStateAction<StatisticsResponse | undefined>
  >;
}

const StatisticsForm = ({ response, setResponse }: StatisticsFormProps) => {
  const [query, setQuery] = React.useState({} as StatisticsQuery);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (value === "") {
      const newQuery = { ...query };
      delete newQuery[name];
      setQuery(newQuery);
    } else {
      setQuery({ ...query, [name]: value });
    }
  };
  return (
    <Paper sx={{ my: "5%", width: "80%", mx: "auto" }}>
      <Grid
        justifyContent="space-between"
        container
        rowSpacing={3}
        columnSpacing={2}
        sx={{ width: "80%", mx: "auto" }}
      >
        <Grid item xs={3}>
          <TextField
            label="Device"
            placeholder="any"
            value={query.device}
            name="device"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Origin"
            placeholder="any"
            value={query.origin}
            name="origin"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Description"
            placeholder="any"
            value={query.description}
            name="description"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Subspecification"
            placeholder="any"
            value={query.subSpecification}
            name="subSpecification"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="First TF orbit"
            placeholder="any"
            value={query.firstTForbit}
            name="firstTForbit"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="TF counter"
            placeholder="any"
            value={query.tfCounter}
            name="tfCounter"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Run number"
            placeholder="any"
            value={query.runNumber}
            name="runNumber"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Task hash"
            placeholder="any"
            value={query.taskHash}
            name="taskHash"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={4}>
          <SerializationSelect query={query} setQuery={setQuery} />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Payload parts"
            placeholder="any"
            value={query.payloadParts}
            name="payloadParts"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Payload split index"
            placeholder="any"
            value={query.payloadSplitIndex}
            name="payloadSplitIndex"
            onChange={handleTextFieldChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-around">
            <RangeInput
              query={query}
              setQuery={setQuery}
              handleTextFieldChange={handleTextFieldChange}
              minValueName="minStartTime"
              maxValueName="maxStartTime"
              title="Start time"
            />
            <RangeInput
              query={query}
              setQuery={setQuery}
              handleTextFieldChange={handleTextFieldChange}
              minValueName="minCreationTime"
              maxValueName="maxCreationTime"
              title="Creation time"
            />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-around">
            <RangeInput
              query={query}
              setQuery={setQuery}
              handleTextFieldChange={handleTextFieldChange}
              minValueName="minDuration"
              maxValueName="maxDuration"
              title="Duration"
            />
            <RangeInput
              query={query}
              setQuery={setQuery}
              handleTextFieldChange={handleTextFieldChange}
              minValueName="minPayloadSize"
              maxValueName="maxPayloadSize"
              title="Payload size"
            />
          </Stack>
        </Grid>
        <Grid item xs={12} mb="1em">
          <Stack direction="row" justifyContent="space-evenly">
            <Button
              variant="contained"
              onClick={() => {
                console.log(query);
              }}
              sx={{ flex: 0.3 }}
            >
              Search
            </Button>
            <NumberedButton />
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
};

enum RangeRule {
  ANY = "ANY",
  LESS = "LESS",
  MORE = "MORE",
  BETWEEN = "BETWEEN",
}

interface RangeInputProps {
  query: StatisticsQuery;
  setQuery: React.Dispatch<React.SetStateAction<StatisticsQuery>>;
  handleTextFieldChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  minValueName: string;
  maxValueName: string;
  title: string;
}

const RangeInput = ({
  query,
  setQuery,
  handleTextFieldChange,
  minValueName,
  maxValueName,
  title,
}: RangeInputProps) => {
  const [rule, setRule] = React.useState(RangeRule.ANY);

  const handleChange = (event: SelectChangeEvent) => {
    const newRule = event.target.value as RangeRule;
    const newQuery = { ...query };
    if (newRule === RangeRule.ANY || newRule === RangeRule.LESS) {
      delete newQuery[minValueName];
    }
    if (newRule === RangeRule.ANY || newRule === RangeRule.MORE) {
      delete newQuery[maxValueName];
    }
    setQuery(newQuery);
    setRule(newRule);
  };

  return (
    <Stack flex={0.5} direction="row" justifyContent="center" spacing={1}>
      <FormControl sx={{ flex: 0.6 }}>
        <InputLabel>{title}</InputLabel>
        <Select autoWidth value={rule} label={title} onChange={handleChange}>
          <MenuItem value={RangeRule.ANY}>Any</MenuItem>
          <MenuItem value={RangeRule.LESS}>Less than</MenuItem>
          <MenuItem value={RangeRule.MORE}>More than</MenuItem>
          <MenuItem value={RangeRule.BETWEEN}>Between</MenuItem>
        </Select>
      </FormControl>
      {rule === RangeRule.LESS && (
        <TextField
          sx={{ flex: 0.3 }}
          value={query[maxValueName]}
          name={maxValueName}
          onChange={handleTextFieldChange}
        />
      )}
      {rule === RangeRule.MORE && (
        <TextField
          sx={{ flex: 0.3 }}
          value={query[minValueName]}
          name={minValueName}
          onChange={handleTextFieldChange}
        />
      )}
      {rule === RangeRule.BETWEEN && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flex: 0.4 }}
        >
          <TextField
            value={query[minValueName]}
            name={minValueName}
            onChange={handleTextFieldChange}
          />{" "}
          <Typography variant="body1">and</Typography>
          <TextField
            value={query[maxValueName]}
            name={maxValueName}
            onChange={handleTextFieldChange}
          />
        </Stack>
      )}
    </Stack>
  );
};

enum SerializationMethod {
  ANY = "ANY",
  NONE = "NONE",
  ROOT = "ROOT",
  ARROW = "ARROW",
}

interface SerializationSelectProps {
  query: StatisticsQuery;
  setQuery: React.Dispatch<React.SetStateAction<StatisticsQuery>>;
}

const SerializationSelect = ({ query, setQuery }: SerializationSelectProps) => {
  const [serializationMethod, setSerializationMethod] = React.useState(
    SerializationMethod.ANY
  );

  const handleChange = (event: SelectChangeEvent) => {
    const newSerialization = event.target.value as SerializationMethod;
    const newQuery = { ...query };
    if (newSerialization === SerializationMethod.ANY) {
      delete newQuery["payloadSerialization"];
    } else {
      newQuery.payloadSerialization = newSerialization;
    }
    setQuery(newQuery);
    setSerializationMethod(newSerialization);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Serialization</InputLabel>
      <Select
        autoWidth
        value={serializationMethod}
        label="Serialization"
        onChange={handleChange}
      >
        <MenuItem value={SerializationMethod.ANY}>Any</MenuItem>
        <MenuItem value={SerializationMethod.ARROW}>Arrow</MenuItem>
        <MenuItem value={SerializationMethod.ROOT}>Root</MenuItem>
        <MenuItem value={SerializationMethod.NONE}>None</MenuItem>
      </Select>
    </FormControl>
  );
};

const NumberedButton = () => {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <ButtonGroup disableElevation variant="contained">
      <Button
        onClick={() => {
          if (quantity > 1) setQuantity(quantity - 1);
        }}
      >
        -
      </Button>
      <Button fullWidth>Search last {quantity > 1 ? quantity : ""}</Button>
      <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
    </ButtonGroup>
  );
};

export { StatisticsForm };
