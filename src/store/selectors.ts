import State from "./state";

const selectAddress = (state: State) => state.analysisHost;
const selectIsRunActive = (state: State) => state.isRunActive;
const selectSelectedDevices = (state: State) =>
  state.devices.filter((device) => device.isSelected);
const selectLastMessageId = (state: State) => state.lastMessageId;

export {
  selectAddress,
  selectIsRunActive,
  selectSelectedDevices,
  selectLastMessageId,
};
