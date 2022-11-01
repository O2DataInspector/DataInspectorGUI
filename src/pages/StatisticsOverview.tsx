import React from "react";

import NavigationBar, * as Buttons from "components/NavigationBar";
import { Stack, Container } from "@mui/material";

const StatisticsOverview = () => {
  return (
    <Stack direction="column">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      <Container sx={{flex:1}}>

      </Container>
    </Stack>
  );
};


export default StatisticsOverview;