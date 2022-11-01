import React from "react";

import NavigationBar, * as Buttons from "components/NavigationBar";
import { Stack, Container } from "@mui/material";
import MenuTabs from "components/MenuTabs";

const StatisticsOverview = () => {
  return (
    <Stack direction="column">
      <NavigationBar>
        <Buttons.Disconnect />
        <Buttons.SelectDevices />
      </NavigationBar>
      <Container sx={{flex:1}}>
      <MenuTabs/>
      </Container>
    </Stack>
  );
};


export default StatisticsOverview;