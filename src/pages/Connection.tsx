import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import ConnectionForm from "components/ConnectionForm";
import NavigationBar from "components/NavigationBar";
import { setAddress } from "store/actions";

import { Container, Box } from "@mui/material";

const Connection = () => {
  const store = Redux.useStore();
  const history = Router.useHistory();

  function onSubmit(address: string) {
    store.dispatch(setAddress(address));
    history.push("/runs");
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
