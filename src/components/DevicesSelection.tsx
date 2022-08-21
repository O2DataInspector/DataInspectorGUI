import Axios from "axios";
import React from "react";
import * as Redux from "react-redux";
import * as Router from "react-router-dom";
import { Store } from "redux";

import State, { Device } from "store/state";
import { setDevices } from "store/actions";
import { selectAddress } from "store/selectors";

import "./devices-selection.css";
import "components/common.css";

interface DevicesSelectionProps {
  devices: Device[];
}

const DevicesSelection = ({ devices }: DevicesSelectionProps) => {
  const [state, setState] = React.useState(devices);
  const store = Redux.useStore() as Store<State>;
  const history = Router.useHistory();

  function onClick(device: Device) {
    setState(
      state.map((other) =>
        other === device ? { ...other, isSelected: !other.isSelected } : other
      )
    );
  }

  function selectAll() {
    setState(state.map((device) => ({ ...device, isSelected: true })));
  }

  function deselectAll() {
    setState(state.map((device) => ({ ...device, isSelected: false })));
  }

  function onSave() {
    const address = selectAddress(store.getState());
    Axios.get(address + "/select-devices", {
      headers: {
        devices: state.filter(device => device.isSelected).map(d => d.name).join(","),
      },
    })
      .then((_) => {
        store.dispatch(setDevices(state));
        history.push("/dashboard");
      })
      .catch((error) => {
        alert("Failed to refresh the messages: " + error);
        store.dispatch(setDevices(state));
        history.goBack();
      });
  }

  function onCancel() {
    history.goBack();
  }

  return (
    <div id="devices-selection" className="col2">
      <div id="devices-listing" className="row3">
        <span>Select devices to inspect:</span>
        <div id="selection-buttons1" className="col2">
          <button id="selection-select" onClick={selectAll}>
            Select all
          </button>
          <button id="selection-deselect" onClick={deselectAll}>
            Deselect all
          </button>
        </div>
        {state.map((device) => (
          <SelectionOption
            key={device.name}
            device={device}
            onClick={onClick}
          />
        ))}
      </div>
      <div id="selection-buttons2" className="col2">
        <button id="selection-save" onClick={onSave}>
          Save
        </button>
        <button id="selection-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface SelectionOptionProps {
  device: Device;
  onClick: (device: Device) => void;
}

const SelectionOption = ({ device, onClick }: SelectionOptionProps) => (
  <label>
    <input
      type="checkbox"
      onChange={() => onClick(device)}
      checked={device.isSelected}
    />
    {device.name}
  </label>
);

const mapState = (state: State) => ({
  devices: state.devices,
});

export default Redux.connect(mapState)(DevicesSelection);
