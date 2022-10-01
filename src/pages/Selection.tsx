import React from "react";
import DevicesSelection from "components/DevicesSelection";
import NavigationBar, * as Buttons from "components/NavigationBar";

import { Box } from "@mui/material";

const Selection = () => (
  <Box display="flex" flexDirection="column" height="100%">
    <NavigationBar>
      <Buttons.Disconnect />
    </NavigationBar>
    <DevicesSelection />
  </Box>
);

export default Selection;
