import React from "react";

import NavigationBar, * as Buttons from "components/NavigationBar";
import {
  Stack,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
} from "@mui/material";
import MenuTabs from "components/MenuTabs";

enum GroupingMethod {
  None = "",
  Device = "DEVICE",
  Serialization = "SERIALIZATION",
  Origin = "ORIGIN",
  Description = "DESCRIPTION",
}

const StatisticsOverview = () => {
  const [groupingMethod, setGroupingMethod] = React.useState(
    GroupingMethod.None
  );

  const handleChange = (event: SelectChangeEvent) => {
    setGroupingMethod(event.target.value as GroupingMethod);
  };

  return (
    <Stack direction="column">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      <Container sx={{ flex: 1 }}>
        <MenuTabs />
        <GroupingSelection
          groupingMethod={groupingMethod}
          onChange={handleChange}
        />
      </Container>
    </Stack>
  );
};

interface GroupingSelectionProps {
  groupingMethod: string;
  onChange: (e: SelectChangeEvent) => void;
}

const GroupingSelection = ({
  groupingMethod,
  onChange,
}: GroupingSelectionProps) => {
  return (
    <Box sx={{ width: "50%", mx: "auto", my: "1em" }}>
      <FormControl fullWidth>
        <InputLabel>Group by</InputLabel>
        <Select value={groupingMethod} label="Group by" onChange={onChange}>
          <MenuItem value={GroupingMethod.Device}>Device</MenuItem>
          <MenuItem value={GroupingMethod.Serialization}>
            Serialization method
          </MenuItem>
          <MenuItem value={GroupingMethod.Origin}>Origin</MenuItem>
          <MenuItem value={GroupingMethod.Description}>Description</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default StatisticsOverview;
