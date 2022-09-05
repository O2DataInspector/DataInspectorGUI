import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";

import { MessageHeader, SimpleMessageView } from "components/Message";
import NavigationBar, * as Buttons from "components/NavigationBar";
import RefreshIcon from "icons/refresh.svg";
import { setMessages } from "store/actions";
import { selectAddress, selectSelectedDevices } from "store/selectors";
import State, { Device, Message } from "store/state";

import "components/common.css";
import "pages/dashboard.css";
import { Store } from "redux";

interface DashboardProps {
  devices: Device[];
}

const Dashboard = ({ devices }: DashboardProps) => {
  const store = Redux.useStore() as Store<State>;

  function onRefresh() {
    const address = selectAddress(store.getState());
    const selectedDevices = selectSelectedDevices(store.getState());
    Axios.get(address + "/inspected-data", {
      headers: {
        devices: selectedDevices.map((device) => device.name).join(","),
        count: "5",
      },
    })
      .then((data) => {
        if (data.data) {
          console.log(data.data);
          store.dispatch(setMessages(data.data as Message[]));
        }
      })
      .catch((error) => {
        alert("Failed to refresh the messages: " + error);
      });
  }

  return (
    <div id="dashboard" className="row2col2">
      <NavigationBar>
        <Buttons.SelectDevices />
        <Buttons.Disconnect />
      </NavigationBar>
      {devices.length ? (
        <NonEmptyDashboard devices={devices} />
      ) : (
        <EmptyDashboard />
      )}
      <div id="dashboard-refresh">
        <img onClick={onRefresh} src={RefreshIcon} alt="RefreshIcon" />
      </div>
    </div>
  );
};

const EmptyDashboard = () => (
  <div id="dashboard-empty" className="row2">
    <span>No devices to display</span>
    <br />
    <span>Refresh or select different devices to inspect</span>
  </div>
);

const NonEmptyDashboard = ({ devices }: DashboardProps) => (
  <div id="dashboard-non-empty" className="flex-row">
    {devices.map((device) => (
      <DeviceView key={device.name} device={device} />
    ))}
  </div>
);

interface DeviceViewProps {
  device: Device;
}

const DeviceView = ({ device }: DeviceViewProps) => {
  const message = device.messages.find((message) => message.isDisplayed);
  const history = Router.useHistory();

  function onClick() {
    history.push(`/overview/${device.name}`);
  }

  if (message === undefined) {
    return null;
  }
  return (
    <div className="row3">
      <MessageHeader device={device} />
      <button id="dashboard-device-view" onClick={onClick}>
        View
      </button>
    </div>
  );
};

const mapState = (state: State) => ({
  devices: state.devices.filter((device) => device.messages.length),
});

export default Redux.connect(mapState)(Dashboard);
