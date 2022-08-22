import State from "./state";

const selectAddress = (state: State) => state.analysisHost;
const selectSelectedDevices = (state: State) =>
  state.devices.filter((device) => device.isSelected);

export { selectAddress, selectSelectedDevices };
