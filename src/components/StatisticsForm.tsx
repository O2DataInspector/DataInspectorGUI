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

const StatisticsForm = () => {
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
          <TextField label="Device" placeholder="any" />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Origin" placeholder="any" />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Description" placeholder="any" />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Subspecification"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="First TF orbit"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="TF counter"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Run number"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Task hash" placeholder="any" />
        </Grid>
        <Grid item xs={4}>
          <SerializationSelect />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Payload parts"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            inputProps={{ min: 0 }}
            label="Payload split index"
            placeholder="any"
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-around">
            <RangeInput title="Start time" />
            <RangeInput title="Creation time" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-around">
            <RangeInput title="Duration" />
            <RangeInput title="Payload size" />
          </Stack>
        </Grid>
        <Grid item xs={12} mb="1em">
          <Stack direction="row" justifyContent="space-evenly">
            <Button variant="contained" sx={{ flex: 0.3 }}>
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
  title: string;
}

const RangeInput = ({ title }: RangeInputProps) => {
  const [rule, setRule] = React.useState(RangeRule.ANY);

  const handleChange = (event: SelectChangeEvent) => {
    setRule(event.target.value as RangeRule);
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
      {rule === RangeRule.LESS && <TextField sx={{ flex: 0.3 }} />}
      {rule === RangeRule.MORE && <TextField sx={{ flex: 0.3 }} />}
      {rule === RangeRule.BETWEEN && (
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={{ flex: 0.4 }}
        >
          <TextField /> <Typography variant="body1">and</Typography>
          <TextField />
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

const SerializationSelect = () => {
  const [serializationMethod, setSerializationMethod] = React.useState(
    SerializationMethod.ANY
  );

  const handleChange = (event: SelectChangeEvent) => {
    setSerializationMethod(event.target.value as SerializationMethod);
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
