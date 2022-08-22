import React from "react";
import DevicesSelection from "components/DevicesSelection";
import NavigationBar, * as Buttons from "components/NavigationBar";

import "components/common.css";
import "pages/selection.css";

const Selection = () => (
  <div id="selection" className="row2">
    <NavigationBar>
      <Buttons.Disconnect />
    </NavigationBar>
    <DevicesSelection />
  </div>
);

export default Selection;
