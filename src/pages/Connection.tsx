import Axios from "axios";
import React from "react";
import { TailSpin } from "react-loader-spinner";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import ConnectionForm from "components/ConnectionForm";
import NavigationBar from "components/NavigationBar";
import WebIcon from "icons/web.svg";
import { setTopologyDetails } from "store/actions";

import "components/common.css";
import "pages/connection.css";
import { Container, Box } from "@mui/material";

const Connection = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const store = Redux.useStore();
  const history = Router.useHistory();

  function onSubmit(address: string) {
    setIsLoading(true);
    Axios.get(address + "/available-devices")
      .then((response) => {
        const devices = response.data.split("\n");
        store.dispatch(setTopologyDetails(address, devices));
        setIsLoading(false);
        history.push("/dashboard");
      })
      .catch((_) => {
        alert("Failed to connect. Is the analysis task running?");
        setIsLoading(false);
      });
  }

  return (
    <React.Fragment>
      <NavigationBar> </NavigationBar>
      <Container sx={{ height: "75%", mt: "5%" }}>
        <Box height="100%" width="50%" sx={{ mx: "auto" }}>
          <ConnectionForm onSubmit={onSubmit} />
          {isLoading ? <Spinner /> : <br />}
        </Box>
      </Container>
    </React.Fragment>
  );
};

const Spinner = () => (
  <div id="loader">
    <TailSpin color="#000000A0" height="40px" />
  </div>
);

export default Connection;
