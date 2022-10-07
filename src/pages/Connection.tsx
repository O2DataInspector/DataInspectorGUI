import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import ConnectionForm from "components/ConnectionForm";
import NavigationBar from "components/NavigationBar";
import { setTopologyDetails } from "store/actions";

import { Container, Box } from "@mui/material";

const Connection = () => {
  const store = Redux.useStore();
  const history = Router.useHistory();

  function onSubmit(address: string) {
    Axios.get(address + "/available-devices")
      .then((response) => {
        const devices = response.data.split("\n");
        store.dispatch(setTopologyDetails(address, devices));
        history.push("/dashboard");
      })
      .catch((_) => {
        alert("Failed to connect. Is proxy running?");
      });
  }

  return (
    <React.Fragment>
      <NavigationBar> </NavigationBar>
      <Container sx={{ height: "75%", mt: "5%" }}>
        <Box height="100%" width="50%" sx={{ mx: "auto" }}>
          <ConnectionForm onSubmit={onSubmit} />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Connection;
